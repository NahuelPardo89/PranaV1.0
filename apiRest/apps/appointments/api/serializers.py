from datetime import date, datetime
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework import serializers
from apps.usersProfile.models import DoctorProfile
from apps.appointments.models import Appointment, PaymentMethod


def appointment_validation(attrs, instance=None):
    """
    Custom validation method for the Appointment object.
    Applies additional validation rules.

    Args:
        attrs (dict): The validated data for the serializer.
        instance (Appointment, optional): The existing Appointment instance for update validation.

    Returns:
        dict: The validated data.

    Raises:
        serializers.ValidationError: If any validation rule fails.
    """

    # Check if there is an existing appointment on the same day and time for the doctor
    existing_appointment = Appointment.objects.filter(
        Q(day=attrs.get('day')),
        Q(hour=attrs.get('hour')),
        Q(doctor=attrs.get('doctor'))
    )

    # If is an update we must exclude the current instance
    if instance is not None:
        existing_appointment = existing_appointment.exclude(
            pk=instance.pk)

    if existing_appointment.exists():
        raise serializers.ValidationError(
            "Ya existe un turno agendado para este doctor en el día y horario seleccionado.")

    # Check if the appointment day is in the past
    if attrs.get('day') < date.today():
        raise serializers.ValidationError(
            "El turno no puede ser reservado en un día anterior al actual.")

    # Check if the appointment hour is within working hours (7 AM to 9 PM)
    if attrs.get('hour').hour < 7 or attrs.get('hour').hour > 21:
        raise serializers.ValidationError(
            "Los turnos solo pueden ser programados entre las 7 AM y las 21 PM.")

    # Check if the appointment time is in the past
    current_time = datetime.now().time()
    if (attrs.get('day') == date.today() and attrs.get('hour') < current_time):
        raise serializers.ValidationError(
            "El turno no puede ser reservado en una hora anterior a la actual.")

    # Check if the cost is non-negative integer
    if attrs.get('full_cost') is not None and attrs.get('full_cost') < 0:
        raise serializers.ValidationError(
            "El costo de la consulta no puede ser negativo.")

    # Check if the appointment fit with the doctor schedule
    try:
        doctor = attrs.get('doctor')
        schedule = doctor.schedules.filter(
            day=attrs.get('day').strftime("%A").lower()[0:3])

        # Look for an empty schedule (the professional isn't working that day)
        if not schedule.exists():
            raise serializers.ValidationError(
                "El profesional no trabaja en el día seleccionado.")

        appointment_start = datetime.combine(
            attrs.get('day'), attrs.get('hour'))
        appointment_end = appointment_start + attrs.get('duration')

        # Find professional schedule
        appointment_flag = False
        for entry in schedule:
            schedule_start = datetime.combine(attrs.get('day'), entry.start)
            schedule_end = datetime.combine(attrs.get('day'), entry.end)

            # The appointment fits within at least one schedule range
            if appointment_start >= schedule_start and appointment_end <= schedule_end:
                appointment_flag = True

        if not appointment_flag:
            raise serializers.ValidationError(
                "El profesional no trabaja en el horario seleccionado.")

    # In a update case, check if the professional exists
    except DoctorProfile.DoesNotExist:
        raise serializers.ValidationError(
            "Profesional no encontrado")

    # Checks that exists a payment method when state is 4 ('Pagado')
    if attrs.get('state') == '4' and attrs.get('payment_method') is None:
        raise serializers.ValidationError(
            "Se debe asignar un método de pago para un estado 'Pagado'.")

    # Update -> Checks if the professional and the patient shares the given hi
    if (instance is not None) and (attrs.get('health_insurance') not in instance.find_common_hi()):
        raise serializers.ValidationError(
            "Profesional y paciente no comparten esta obra social.")

    # Checks if the professional have the given specialty
    try:
        doctor = attrs.get('doctor')
        if attrs.get('specialty') and attrs.get('specialty') not in doctor.specialty.all():
            raise serializers.ValidationError(
                "El profesional no tiene esa especialidad")
    except DoctorProfile.DoesNotExist:
        raise serializers.ValidationError(
            "Profesional no encontrado")
    return attrs


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
        appointment.set_specialty()
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
        instance.specialty = validated_data.get(
            'specialty', instance.specialty)
        instance.patient = validated_data.get('patient', instance.patient)
        instance.health_insurance = validated_data.get(
            'health_insurance', instance.health_insurance)
        instance.day = validated_data.get('day', instance.day)
        instance.hour = validated_data.get('hour', instance.hour)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.full_cost = validated_data.get(
            'full_cost', instance.full_cost)
        instance.payment_method = validated_data.get(
            'payment_method', instance.payment_method)
        instance.state = validated_data.get('state', instance.state)
        instance.set_cost(update=True)
        instance.save()
        return instance

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
        instance = self.instance
        attrs = super().validate(attrs)
        attrs = appointment_validation(attrs, instance=instance)
        return attrs


class PaymentMethodSerializer(serializers.ModelSerializer):
    """
    Serializer for the PaymentMethod model.
    """
    class Meta:
        model = PaymentMethod
        fields = '__all__'


class PatientAppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for appointments, showing only specific fields for the patient.
    """

    state = serializers.CharField(required=False)

    class Meta:
        model = Appointment
        fields = ('day', 'hour', 'patient', 'specialty',
                  'doctor', 'health_insurance', 'state', 'duration')
        read_only_fields = ('health_insurance',)

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
        appointment.set_specialty()
        appointment.save()
        return appointment

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
        instance = self.instance
        attrs = super().validate(attrs)
        attrs = appointment_validation(attrs, instance=instance)
        return attrs


class DoctorAppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for appointments, showing only specific fields for the doctor.
    """

    class Meta:
        model = Appointment
        fields = ('day', 'hour', 'duration', 'full_cost',
                  'state', 'doctor', 'health_insurance', 'patient',)
        read_only_fields = ('specialty',)

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
        appointment.set_specialty()
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
        instance.day = validated_data.get('day', instance.day)
        instance.hour = validated_data.get('hour', instance.hour)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.full_cost = validated_data.get(
            'full_cost', instance.full_cost)
        instance.state = validated_data.get('state', instance.state)
        instance.set_cost(update=True)
        instance.save()
        return instance

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
        instance = self.instance
        attrs = super().validate(attrs)
        attrs = appointment_validation(attrs, instance=instance)
        return attrs
