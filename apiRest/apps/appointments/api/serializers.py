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

    return attrs


def validate_appointment_day(attrs):
    # Check if the appointment day is in the past
    if attrs.get('day') < date.today():
        raise serializers.ValidationError(
            "El turno no puede ser reservado en un día anterior al actual.")
    return attrs


def validate_bussines_working_hour(attrs):
    # Check if the appointment hour is within working hours (7 AM to 9 PM)
    if attrs.get('hour').hour < 7 or attrs.get('hour').hour > 21:
        raise serializers.ValidationError(
            "Los turnos solo pueden ser programados entre las 7 AM y las 21 PM.")
    return attrs


def validate_appointment_hour(attrs):
    # Check if the appointment time is in the past
    current_time = datetime.now().time()
    if (attrs.get('day') == date.today() and attrs.get('hour') < current_time):
        raise serializers.ValidationError(
            "El turno no puede ser reservado en una hora anterior a la actual.")
    return attrs


def validate_negative_full_cost(attrs):
    # Check if the cost is non-negative integer
    if attrs.get('full_cost') is not None and attrs.get('full_cost') < 0:
        raise serializers.ValidationError(
            "El costo de la consulta no puede ser negativo.")
    return attrs


def validate_doctor_schedule(attrs, instance):
    # Check if the appointment fit with the doctor schedule
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
                "El profesional no trabaja en el horario seleccionado.")

    # In a update case, check if the professional exists
    except DoctorProfile.DoesNotExist:
        raise serializers.ValidationError(
            "Profesional no encontrado")

    return attrs

def validate_paid_state(attrs, instance):
    # Checks that exists a payment method when state is 4 ('Pagado')
    # Creation
    if attrs.get('state') == 4 and attrs.get('payment_method') is None:
        raise serializers.ValidationError(
            "Se debe asignar un método de pago para un turno con estado 'Pagado'.")
    # Update 
    # if instance and 
    return attrs

def validate_hi(attrs, instance):
    # Checks if the professional and the patient shares the given hi
    # Creation 
    doctor = attrs.get('doctor')
    patient = attrs.get('patient')
    common_insurances = set(doctor.insurances.all()) & set(
            patient.insurances.all())
    if attrs.get('health_insurance') and attrs.get('health_insurance') not in common_insurances :
        raise serializers.ValidationError(
            "Profesional y paciente no comparten esta obra social.")
    
    # Update
    if (instance is not None) and attrs.get('health_insurance') and (attrs.get('health_insurance') not in instance.find_common_hi()):
        raise serializers.ValidationError(
            "Profesional y paciente no comparten esta obra social.")
    return attrs

def validate_specialty(attrs):
    # Checks if the professional have the given specialty, probably never used :S
    doctor = attrs.get('doctor')
    if attrs.get('specialty') and attrs.get('specialty') not in doctor.specialty.all():
        raise serializers.ValidationError(
            "El profesional no trabaja con la especialidad dada")
    return attrs

def validate_branch(attrs):
    if attrs.get('branch') and not InsurancePlanDoctor.objects.filter(doctor=attrs.get('doctor'), branch=attrs.get('branch')).exists():
        raise serializers.ValidationError(
            "El profesional no trabaja con la rama especificada")
    return attrs

def validate_branch_hi(attrs):
    if attrs.get('branch') and attrs.get('health_insurance') and not InsurancePlanDoctor.objects.filter(doctor=attrs.get('doctor'), insurance=attrs.get('health_insurance'), branch=attrs.get('branch')).exists():
        raise serializers.ValidationError(
            "No existe relación entre profesional, rama y obra social")
    return attrs

def validate_base_hi():
    base_hi = HealthInsurance.objects.filter(
        name='PARTICULAR').first()
    if base_hi is None:
        raise serializers.ValidationError(
            "Debido a que todos los profesionales atienden de manera particular, por favor cargue la obra social: 'PARTICULAR' ")

def validate_base_hi_branch(attrs):
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
    # Creation
    if not instance and attrs.get('state') == 4 and attrs.get('branch') is None:
        raise serializers.ValidationError(
            "Se debe asignar una rama para un turno con estado 'Pagado'.")
    return attrs

def validate_payment_state(attrs, instance):
    if not instance and attrs.get('state') != 4 and attrs.get('payment_method'):
        raise serializers.ValidationError(
            "No se puede asignar un método de pago a un turno con estado DISTINTO de 'Pagado'.")
    elif instance and instance.state == 4 and attrs.get('state') != 4:
        raise serializers.ValidationError(
            "Este turno se ha registrado como pagado, no es posible cambiar el estado de este turno.")

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

    # # Check if there is an existing appointment on the same day and time for the doctor
    validate_existing_appointment(attrs, instance)

    # existing_appointment = Appointment.objects.filter(
    #     Q(day=attrs.get('day')),
    #     Q(hour=attrs.get('hour')),
    #     Q(doctor=attrs.get('doctor'))
    # )

    # # If is an update we must exclude the current instance
    # if instance is not None:
    #     existing_appointment = existing_appointment.exclude(
    #         pk=instance.pk)

    # if existing_appointment.exists():
    #     raise serializers.ValidationError(
    #         "Ya existe un turno agendado para este doctor en el día y horario seleccionado.")

    # # Check if the appointment day is in the past
    validate_appointment_day(attrs)
    # if attrs.get('day') < date.today():
    #     raise serializers.ValidationError(
    #         "El turno no puede ser reservado en un día anterior al actual.")

    # Check if the appointment hour is within working hours (7 AM to 9 PM)
    validate_bussines_working_hour(attrs)
    # if attrs.get('hour').hour < 7 or attrs.get('hour').hour > 21:
    #     raise serializers.ValidationError(
    #         "Los turnos solo pueden ser programados entre las 7 AM y las 21 PM.")

    # Check if the appointment time is in the past
    validate_appointment_hour(attrs)
    # current_time = datetime.now().time()
    # if (attrs.get('day') == date.today() and attrs.get('hour') < current_time):
    #     raise serializers.ValidationError(
    #         "El turno no puede ser reservado en una hora anterior a la actual.")

    # Check if the cost is non-negative integer
    validate_negative_full_cost(attrs)
    # if attrs.get('full_cost') is not None and attrs.get('full_cost') < 0:
    #     raise serializers.ValidationError(
    #         "El costo de la consulta no puede ser negativo.")

    # Check if the appointment fit with the doctor schedule
    validate_doctor_schedule(attrs, instance)
    # try:
    #     doctor = attrs.get('doctor')
    #     # set the appointment duration based on the current doctor
    #     attrs = set_duration(attrs, instance)
    #     schedule = doctor.schedules.filter(
    #         day=attrs.get('day').strftime("%A").lower()[0:3])

    #     # Look for an empty schedule (the professional isn't working that day)
    #     if not schedule.exists():
    #         raise serializers.ValidationError(
    #             "El profesional no trabaja en el día seleccionado.")

    #     appointment_start = datetime.combine(
    #         attrs.get('day'), attrs.get('hour'))
    #     appointment_end = appointment_start + attrs.get('duration')

    #     # Find professional schedule
    #     appointment_flag = False
    #     for entry in schedule:
    #         schedule_start = datetime.combine(attrs.get('day'), entry.start)
    #         schedule_end = datetime.combine(attrs.get('day'), entry.end)

    #         # The appointment fits within at least one schedule range
    #         if appointment_start >= schedule_start and appointment_end <= schedule_end:
    #             appointment_flag = True

    #     if not appointment_flag:
    #         raise serializers.ValidationError(
    #             "El profesional no trabaja en el horario seleccionado.")

    # In a update case, check if the professional exists
    # except DoctorProfile.DoesNotExist:
    #     raise serializers.ValidationError(
    #         "Profesional no encontrado")

    # Checks that exists a payment method when state is 4 ('Pagado')
    validate_paid_state(attrs, instance)
    # if attrs.get('state') == 4 and attrs.get('payment_method') is None:
    #     raise serializers.ValidationError(
    #         "Se debe asignar un método de pago para un turno con estado 'Pagado'.")

    # Checks if the professional and the patient shares the given hi
    validate_hi(attrs, instance)
    # if (instance is not None) and attrs.get('health_insurance') and (attrs.get('health_insurance') not in instance.find_common_hi()):
    #     raise serializers.ValidationError(
    #         "Profesional y paciente no comparten esta obra social.")

    # Checks if the professional have the given specialty
    validate_specialty(attrs)
    # try:
    #     doctor = attrs.get('doctor')
    #     if attrs.get('specialty') and attrs.get('specialty') not in doctor.specialty.all():
    #         raise serializers.ValidationError(
    #             "El profesional no trabaja con la especialidad dada")
    # except DoctorProfile.DoesNotExist:
    #     raise serializers.ValidationError(
    #         "Profesional no encontrado")

    # Checks if the professional works with the given branch
    validate_branch(attrs)
    # if attrs.get('branch') and not InsurancePlanDoctor.objects.filter(doctor=attrs.get('doctor'), branch=attrs.get('branch')).exists():
    #     raise serializers.ValidationError(
    #         "El profesional no trabaja con la rama especificada")

    # Checks if the professional works with the given branch and hi
    validate_branch_hi(attrs)
    # if attrs.get('branch') and attrs.get('health_insurance') and not InsurancePlanDoctor.objects.filter(doctor=attrs.get('doctor'), insurance=attrs.get('health_insurance'), branch=attrs.get('branch')).exists():
    #     raise serializers.ValidationError(
    #         "No existe relación entre profesional, rama y obra social")

    # Checks if exists 'PARTICULAR' health insurance
    validate_base_hi()
    # base_hi = HealthInsurance.objects.filter(
    #     name='PARTICULAR').first()
    # if base_hi is None:
    #     raise serializers.ValidationError(
    #         "Debido a que todos los profesionales atienden de manera particular, por favor cargue la obra social: 'PARTICULAR' ")

    # Checks if the professional works with 'PARTICULAR' for this branch (to calculate full cost)
    validate_base_hi_branch(attrs)
    # if attrs.get('branch') is None:
    #     branch = SpecialityBranch.objects.filter(
    #         name='GENERAL', speciality=doctor.specialty.first()).first()
    #     if branch is None:
    #         raise serializers.ValidationError(
    #             f"No se ha indicado ninguna rama para el turno, y la rama por defecto: 'GENERAL' para esta especialidad: {doctor.specialty.first()} no ha sido encontrada")
    # else:
    #     branch = attrs.get('branch')

    # if not InsurancePlanDoctor.objects.filter(
    #         doctor=attrs.get('doctor'), insurance=base_hi, branch=branch).exists():
    #     raise serializers.ValidationError(
    #         "El profesional no trabaja de manera particular con esta rama, imposible calcular el valor total de la consulta")

    # Checks that exists a branch when state is 4 ('Pagado')
    validate_state_branch(attrs, instance)
    # if attrs.get('state') == 4 and attrs.get('branch') is None:
    #     raise serializers.ValidationError(
    #         "Se debe asignar una rama para un turno con estado 'Pagado'.")

    # Checks that
    validate_payment_state(attrs, instance)
    # if attrs.get('state') != 4 and attrs.get('payment_method'):
    #     raise serializers.ValidationError(
    #         "No se puede asignar un método de pago a un turno con estado DISTINTO de 'Pagado'.")
    return attrs


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

    # health_insurance = serializers.StringRelatedField()

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
