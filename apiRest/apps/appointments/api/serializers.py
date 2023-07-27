from datetime import date, datetime
from django.contrib.auth import authenticate
from rest_framework import serializers
from apps.usersProfile.models import DoctorProfile
from apps.appointments.models import Appointment, PaymentMethod


class AppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Appointment model.
    """

    class Meta:
        model = Appointment
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new Appointment instance, given the validated data.

        Args:
            validated_data (dict): Validated data containing the appointment details.

        Returns:
            Appointment: Created Appointment instance.
        """
        appointment = Appointment.objects.create(**validated_data)
        appointment.set_cost()
        appointment.save()
        return appointment

    def update(self, instance, validated_data):
        """
        Update and return an existing Appointment instance, given the validated data.

        Args:
            instance (Appointment): Existing Appointment instance to update.
            validated_data (dict): Validated data containing the updated appointment details.

        Returns:
            Appointment: Updated Appointment instance.
        """
        instance.doctor = validated_data.get('doctor', instance.doctor)
        instance.patient = validated_data.get('patient', instance.patient)
        instance.health_insurance = validated_data.get(
            'health_insurance', instance.health_insurance)
        instance.day = validated_data.get('day', instance.day)
        instance.hour = validated_data.get('hour', instance.hour)
        instance.full_cost = validated_data.get(
            'full_cost', instance.full_cost)
        instance.payment_method = validated_data.get(
            'payment_method', instance.payment_method)
        instance.state = validated_data.get('state', instance.state)
        instance.set_cost(update=True)
        instance.save()
        return instance

    def validate_full_cost(self, full_cost):
        """
        Validate that the full_cost is not negative.
        """
        if full_cost is not None and full_cost < 0:
            raise serializers.ValidationError(
                "El costo de la consulta no puede ser negativo.")

    def validate_hi(self, hi):
        """
        Validate that the patient and the professional shares the given hi.
        """
        if (self.instance is not None) and (hi not in self.instance.find_common_hi()):
            raise serializers.ValidationError(
                "Profesional y paciente no comparten esta obra social.")

    def validate_payment_method(self, state, payment_method):
        """
        Validate that exists a payment method when state is 'Pagado' 
        """
        if state == '4' and payment_method is None:
            raise serializers.ValidationError(
                "Se debe asignar un método de pago para un estado 'Pagado'.")

    def validate(self, attrs):
        """
        Custom validation method for the Appointment object.
        Applies additional validation rules.

        Args:
            attrs (dict): The validated data for the serializer.

        Returns:
            dict: The validated data.

        Raises:
            serializers.ValidationError: If any validation rule fails.
        """

        # Check if there is an existing appointment on the same day and time
        existing_appointment = Appointment.objects.filter(
            day=attrs['day'],
            hour=attrs['hour']
        )

        # If is a update we must exclude the current instance
        if self.instance is not None:
            existing_appointment = existing_appointment.exclude(
                pk=self.instance.pk)

        if existing_appointment.exists():
            raise serializers.ValidationError(
                "Ya existe un turno agendado para este día y horario.")

        # Check if the appointment day is in the past
        if attrs['day'] < date.today():
            raise serializers.ValidationError(
                "El turno no puede ser reservado en un día anterior al actual.")

        # Check if the appointment hour is within working hours (7 AM to 9 PM)
        if attrs['hour'].hour < 7 or attrs['hour'].hour > 21:
            raise serializers.ValidationError(
                "Los turnos solo pueden ser programados entre las 7 AM y las 21 PM.")

        # Check if the appointment time is in the past
        current_time = datetime.now().time()
        if (attrs['day'] == date.today() and attrs['hour'] < current_time):
            raise serializers.ValidationError(
                "El turno no puede ser reservado en una hora anterior a la actual.")

        # Check if the cost is non-negative integer
        self.validate_full_cost(attrs.get('full_cost'))

        # Check if the appointment fit with the doctor schedule
        try:
            doctor = attrs['doctor']
            schedule = doctor.schedules.filter(
                day=attrs['day'].strftime("%A").lower()[0:3])

            # Look for an empty schedule (the professional isn't working that day)
            if not schedule.exists():
                raise serializers.ValidationError(
                    "El profesional no trabaja en el día seleccionado.")

            appointment_start = datetime.combine(attrs['day'], attrs['hour'])
            appointment_end = appointment_start + attrs['duration']

            # Find professional schedule
            for entry in schedule:
                schedule_start = datetime.combine(attrs['day'], entry.start)
                schedule_end = datetime.combine(attrs['day'], entry.end)

            # Check for appointment out of range
            if not (appointment_start >= schedule_start and appointment_end <= schedule_end):
                raise serializers.ValidationError(
                    "El profesional no trabaja en el horario seleccionado.")

        # In a update case, check if the professional exists
        except DoctorProfile.DoesNotExist:
            raise serializers.ValidationError(
                "Profesional no encontrado")

        # Checks the payment method
        self.validate_payment_method(
            attrs.get('state'), attrs.get('payment_method'))

        # Update -> Check if the professional and patient shares the given hi
        self.validate_hi(attrs.get('health_insurance'))
        return attrs


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'
