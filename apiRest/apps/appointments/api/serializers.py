from datetime import date, datetime
from django.contrib.auth import authenticate
from rest_framework import serializers
from apps.appointments.models import Appointment


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
        instance.state = validated_data.get('state', instance.state)
        instance.set_cost()
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
                "There is already an appointment at this date and time.")

        if existing_appointment.exists():
            raise serializers.ValidationError(
                "There is already an appointment at this date and time.")

        # Checks that a paid status is greater than zero
        if attrs['state'] == '4' and attrs['full_cost'] < 0:
            raise serializers.ValidationError(
                "El costo de la consulta debe ser un valor positivo para un estado 'Pagado'.")

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
        if attrs['hour'] < current_time:
            raise serializers.ValidationError(
                "El turno no puede ser reservado en una hora anterior a la actual.")

        # Check if the cost is non-negative integer
        total_cost = attrs['full_cost']
        if total_cost < 0:
            raise serializers.ValidationError(
                "El costo de una consulta no puede ser negativo.")

        # Another option could be check if a doctor.is_active()
        return attrs
