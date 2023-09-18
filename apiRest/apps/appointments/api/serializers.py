from datetime import date, datetime
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework import serializers
from apps.usersProfile.models import DoctorProfile, InsurancePlanDoctor, HealthInsurance, SpecialityBranch
from apps.appointments.models import Appointment, PaymentMethod


def set_duration(attrs, instance=None) -> dict:
    """
    Set the duration for an appointment based on provided attributes or an existing instance.

    Args:
        attrs (dict): A dictionary of appointment attributes.
        instance (Appointment, optional): An existing appointment instance (default is None).

    Returns:
        dict: A dictionary containing appointment attributes, including the 'duration' field.
    """
    if not attrs.get('duration') and not instance:
        # Get duration from doctor
        doctor = attrs.get('doctor')
        attrs['duration'] = doctor.appointment_duration
    elif instance and not attrs.get('duration'):
        # Exists an instance and duration is none, keep the duration of the instance
        attrs['duration'] = instance.duration
    # else = duration already exists in attrs, no need to add manually
    return attrs


def perform_update(instance: Appointment, validated_data: dict) -> Appointment:
    """
    Update an existing appointment instance with validated data.

    Args:
        instance (Appointment): An existing appointment instance to update.
        validated_data (dict): Validated data containing updated appointment details.

    Returns:
        Appointment: The updated appointment instance.
    """
    instance.doctor = validated_data.get('doctor', instance.doctor)
    instance.branch = validated_data.get('branch', instance.branch)
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
    instance.set_cost()
    instance.save()
    return instance


def validate_existing_appointment(attrs, instance):
    """
    Validate the appointment to ensure there is no existing appointment for the same doctor
    on the same day and time.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'day', 'hour', and 'doctor'.
        instance (Appointment): The current appointment instance being updated, if any.

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If an existing appointment is found for the same doctor, day, and time.
    """

    existing_appointment = Appointment.objects.filter(
        Q(day=attrs.get('day')),
        Q(hour=attrs.get('hour')),
        Q(doctor=attrs.get('doctor'))
    )

    # If it's an update, exclude the current instance
    if instance is not None:
        existing_appointment = existing_appointment.exclude(
            pk=instance.pk)

    if existing_appointment.exists():
        raise serializers.ValidationError(
            "Ya existe un turno agendado para este doctor en el día y horario seleccionado.")

    return attrs


def validate_appointment_day(attrs):
    """
    Validate that the appointment day is not in the past.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'day'.

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If the appointment day is in the past.
    """

    if attrs.get('day') < date.today():
        raise serializers.ValidationError(
            "El turno no puede ser reservado en un día anterior al actual.")
    return attrs


def validate_bussines_working_hour(attrs):
    """
    Validate that the appointment hour is within business working hours (7 AM to 9 PM).

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'hour'.

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If the appointment hour is outside the business working hours.
    """

    if attrs.get('hour').hour < 7 or attrs.get('hour').hour > 21:
        raise serializers.ValidationError(
            "Los turnos solo pueden ser programados entre las 7 AM y las 21 PM.")
    return attrs


def validate_appointment_hour(attrs):
    """
    Validate that the appointment time is not in the past.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'day' and 'hour'.

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If the appointment time is in the past.
    """

    current_time = datetime.now().time()
    if (attrs.get('day') == date.today() and attrs.get('hour') < current_time):
        raise serializers.ValidationError(
            "El turno no puede ser reservado en una hora anterior a la actual.")
    return attrs


def validate_negative_full_cost(attrs):
    """
    Validate that the cost of the appointment is non-negative.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'full_cost'.

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If the full cost is negative.
    """

    if attrs.get('full_cost') is not None and attrs.get('full_cost') < 0:
        raise serializers.ValidationError(
            "El costo de la consulta no puede ser negativo.")
    return attrs


def validate_doctor_schedule(attrs, instance):
    """
    Validate that the appointment fits within the doctor's schedule for the selected day and time.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'doctor', 'day', 'hour', and 'duration'.
        instance: The current instance being updated (if applicable).

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If the appointment does not fit within the doctor's schedule or if the doctor is not found.
    """

    try:
        doctor = attrs.get('doctor')
        # set the appointment duration based on the current doctor
        attrs = set_duration(attrs, instance)
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
                """El profesional no trabaja en el horario seleccionado. 
                Se sugiere verificar que la duración de la consulta no exceda el horario de salida del profesional""")

    # In a update case, check if the professional exists
    except DoctorProfile.DoesNotExist:
        raise serializers.ValidationError(
            "Profesional no encontrado")

    return attrs


def validate_hi(attrs, instance):
    """
    Validate that the selected health insurance is shared between the doctor and patient.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'doctor', 'patient', and 'health_insurance'.
        instance: The current instance being updated (if applicable).

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If the selected health insurance is not shared between the doctor and patient.
    """

    # Creation
    doctor = attrs.get('doctor')
    patient = attrs.get('patient')
    common_insurances = set(doctor.insurances.all()) & set(
        patient.insurances.all())
    if not instance and attrs.get('health_insurance') and attrs.get('health_insurance') not in common_insurances:
        raise serializers.ValidationError(
            "Profesional y paciente no comparten esta obra social.")

    # Update
    if (instance is not None) and attrs.get('health_insurance') and (attrs.get('health_insurance') not in instance.find_common_hi()):
        raise serializers.ValidationError(
            "Profesional y paciente no comparten esta obra social.")
    return attrs


def validate_specialty(attrs):
    """
    Validate that the selected specialty is one that the doctor possesses.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'doctor' and 'specialty'.

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If the selected specialty is not one that the doctor possesses.
    """

    doctor = attrs.get('doctor')
    if attrs.get('specialty') and attrs.get('specialty') not in doctor.specialty.all():
        raise serializers.ValidationError(
            "El profesional no trabaja con la especialidad dada")
    return attrs


def validate_branch(attrs):
    """
    Validate that the selected branch is one that the doctor works in.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'doctor' and 'branch'.

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If the selected branch is not one that the doctor works in.
    """

    if attrs.get('branch') and not InsurancePlanDoctor.objects.filter(doctor=attrs.get('doctor'), branch=attrs.get('branch')).exists():
        raise serializers.ValidationError(
            "El profesional no trabaja con la rama especificada")
    return attrs


def validate_branch_hi(attrs):
    """
    Validate that the selected branch and health insurance have a relationship with the doctor.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'doctor', 'branch', and 'health_insurance'.

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If there is no relationship between the professional, branch, and health insurance.
    """

    if attrs.get('branch') and attrs.get('health_insurance') and not InsurancePlanDoctor.objects.filter(doctor=attrs.get('doctor'), insurance=attrs.get('health_insurance'), branch=attrs.get('branch')).exists():
        raise serializers.ValidationError(
            "No existe relación entre profesional, rama y obra social")
    return attrs


def validate_base_hi():
    """
    Validate the existence of the base health insurance ('PARTICULAR').

    Raises:
        serializers.ValidationError: If the base health insurance ('PARTICULAR') does not exist.
    """

    base_hi = HealthInsurance.objects.filter(
        name='PARTICULAR').first()
    if base_hi is None:
        raise serializers.ValidationError(
            "Debido a que todos los profesionales atienden de manera particular, por favor cargue la obra social: 'PARTICULAR' ")


def validate_base_hi_branch(attrs):
    """
    Validate that the base health insurance ('PARTICULAR') is compatible with the selected branch.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'doctor', 'branch'.

    Returns:
        dict: The validated appointment attributes.

    Raises:
        serializers.ValidationError: If the professional doesn't work on the specified branch for the base health insurance.
    """

    doctor = attrs.get('doctor')
    base_hi = HealthInsurance.objects.filter(
        name='PARTICULAR').first()
    if attrs.get('branch') is None:
        branch = SpecialityBranch.objects.filter(
            name='GENERAL', speciality=doctor.specialty.first()).first()
        if branch is None:
            raise serializers.ValidationError(
                f"No se ha indicado ninguna rama para el turno, y la rama por defecto: 'GENERAL' para esta especialidad: {doctor.specialty.first()} no ha sido encontrada")
    else:
        branch = attrs.get('branch')

    if not InsurancePlanDoctor.objects.filter(
            doctor=doctor, insurance=base_hi, branch=branch).exists():
        raise serializers.ValidationError(
            "El profesional no trabaja de manera particular con esta rama, imposible calcular el valor total de la consulta")

    return attrs


def validate_state_branch(attrs, instance):
    """
    Validate that a branch is assigned when the appointment state is 'Paid'.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'state', 'branch'.
        instance (Appointment): The appointment instance being updated.

    Raises:
        serializers.ValidationError: If a branch is not assigned for an appointment with the state 'Paid'.
    """

    if not instance and attrs.get('state') == 4 and attrs.get('branch') is None:
        raise serializers.ValidationError(
            "Se debe asignar una rama para un turno con estado 'Pagado'.")
    return attrs


def validate_payment_state(attrs, instance):
    """
    Validate the assignment of payment method based on the appointment state.

    Args:
        attrs (dict): Dictionary containing appointment attributes, including 'state', 'payment_method'.
        instance (Appointment): The appointment instance being updated.

    Raises:
        serializers.ValidationError: If a payment method is not assigned for an appointment with the state 'Paid', or if a payment method is assigned to an appointment with a state other than 'Paid'.
    """
    # Refactor here
    if not instance and attrs.get('state') == 4 and attrs.get('payment_method') is None:
        raise serializers.ValidationError(
            "Se debe asignar un método de pago para un turno con estado 'Pagado'.")
    elif not instance and attrs.get('state') != 4 and attrs.get('payment_method'):
        raise serializers.ValidationError(
            "No se puede asignar un método de pago a un turno con estado DISTINTO de 'Pagado'.")
    elif instance and attrs.get('state') != 4 and attrs.get('payment_method'):
        raise serializers.ValidationError(
            "No se puede asignar un método de pago a un turno con estado DISTINTO de 'Pagado'.")
    elif instance and instance.state == 4 and attrs.get('state') != 4:
        raise serializers.ValidationError(
            "Este turno se ha registrado como pagado, no es posible cambiar el estado de este turno.")
    elif instance and instance.state != 4 and attrs.get('state') == 4 and attrs.get('payment_method') is None:
        raise serializers.ValidationError(
            "Se debe asignar un método de pago para un turno con estado 'Pagado'.")


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

    validate_existing_appointment(attrs, instance)
    validate_appointment_day(attrs)
    validate_bussines_working_hour(attrs)
    validate_appointment_hour(attrs)
    validate_negative_full_cost(attrs)
    validate_doctor_schedule(attrs, instance)
    validate_hi(attrs, instance)
    validate_specialty(attrs)
    validate_branch(attrs)
    validate_branch_hi(attrs)
    validate_base_hi()
    validate_base_hi_branch(attrs)
    validate_state_branch(attrs, instance)
    validate_payment_state(attrs, instance)

    return attrs


class AppointmentSerializerList(serializers.ModelSerializer):
    doctor = serializers.StringRelatedField()
    health_insurance = serializers.StringRelatedField()
    patient = serializers.StringRelatedField()
    branch = serializers.StringRelatedField()
    specialty = serializers.StringRelatedField()
    payment_method = serializers.StringRelatedField()

    class Meta:
        model = Appointment
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['state'] = instance.get_state_display()
        return rep


class AppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Appointment model for ADMIN.

    Fields:
        All fields of the Appointment model are included for both read and write operations.

    Read-Only Fields:
        - 'hi_copayment': Health insurance copayment, calculated automatically.
        - 'patient_copayment': Patient copayment, calculated automatically.
        - 'specialty': The specialty associated with the appointment, set automatically.

    """

    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('hi_copayment', 'patient_copayment', 'specialty')

    def create(self, validated_data):
        """
        Create and return a new Appointment instance, given the validated data.

        Args:
            validated_data (dict): Validated data containing the appointment details.

        Returns:
            Appointment: Created Appointment instance.
        """
        appointment = Appointment.objects.create(**validated_data)
        appointment.set_fields()
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
        return perform_update(instance, validated_data)

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
    Serializer for patient appointments, only specific fields availables.
    """

    class Meta:
        model = Appointment
        fields = ('day', 'hour', 'patient', 'specialty', 'branch',
                  'doctor', 'health_insurance', 'duration', 'state', )
        read_only_fields = ('health_insurance', 'patient',
                            'specialty', 'full_cost', 'duration', 'state')

    def create(self, validated_data):
        """
        Create and return a new Appointment instance, given the validated data.

        Args:
            validated_data (dict): Validated data containing the appointment details.

        Returns:
            Appointment: Created Appointment instance.
        """
        appointment = Appointment.objects.create(**validated_data)
        appointment.set_fields()
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
    Serializer for doctor appointments, only specific fields availables.
    """

    class Meta:
        model = Appointment
        fields = ('day', 'hour', 'duration', 'full_cost', 'state', 'doctor', 'specialty',
                  'branch', 'patient', 'health_insurance', 'payment_method')
        read_only_fields = ('specialty',
                            'full_cost', 'health_insurance',)

    def create(self, validated_data):
        """
        Create and return a new Appointment instance, given the validated data.

        Args:
            validated_data (dict): Validated data containing the appointment details.

        Returns:
            Appointment: Created Appointment instance.
        """
        appointment = Appointment.objects.create(**validated_data)
        appointment.set_fields()
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
        return perform_update(instance, validated_data)

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
