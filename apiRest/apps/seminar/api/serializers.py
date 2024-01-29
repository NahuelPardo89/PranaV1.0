from datetime import datetime
from rest_framework import serializers
from apps.seminar.models import Room, SeminarRoomUsage, SeminarInscription, Seminar, SeminarSchedule
from apps.usersProfile.models import InsurancePlanSeminarist


class SeminarScheduleSerializer(serializers.ModelSerializer):
    """
    Serializer class for handling SeminarSchedule model instances.

    Author:
        Alvaro Olguin Armendariz    
    """

    class Meta:
        model = SeminarSchedule
        fields = ['id', 'weekday', 'start_hour', 'end_hour']

    def to_representation(self, instance):
        """
        Convert `start_hour` and `end_hour` to strings and remove milliseconds.
        """
        representation = super().to_representation(instance)
        representation['start_hour'] = str(instance.start_hour)[:-3]
        representation['end_hour'] = str(instance.end_hour)[:-3]
        return representation


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'capacity', 'cost',
                  'created_at', 'updated_at', 'created_by']

    def to_representation(self, instance):
        """
        Custom representation method to remove decimal .00 from cost.

        Parameters:
            instance (Room): The Room instance.

        Returns:
            dict: The modified representation of the SeminarInscription instance.

        """

        rep = super().to_representation(instance)
        if rep['cost'].endswith('.00'):
            rep['cost'] = rep['cost'][:-3]
            return rep


class SeminarRoomUsageSerializer(serializers.ModelSerializer):
    seminar = serializers.StringRelatedField()

    class Meta:
        model = SeminarRoomUsage
        fields = ['id', 'seminar', 'room', 'encountersCount']

    def validate_encountersCount(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "El número de encuentros debe ser un valor positivo.")
        return value


class SeminarInscriptionSerializer(serializers.ModelSerializer):
    """
    Serializer class for handling SeminarInscription model instances.

    This serializer provides representation and validation logic for SeminarInscription objects.

    Attributes:
        display (bool): A boolean indicating whether to display detailed information or only IDs.

    Methods:
        get_seminar(obj): Returns the ID or name of the associated seminar, based on the 'display' attribute.
        get_patient(obj): Returns the ID or string representation of the associated patient, based on 'display'.
        get_insurance(obj): Returns the ID or string representation of the associated insurance, based on 'display'.
        get_payment_method(obj): Returns the ID or string representation of the associated payment method, based on 'display'.
        get_seminar_status(obj): Returns the status of the associated seminar, based on 'display'.
        get_payment_status(obj): Returns the payment status, based on 'display'.
        get_created_by(obj): Returns the ID or string representation of the creator, based on 'display'.
        to_representation(instance): Custom representation method to remove decimal .00 from copayment values.
        validate(data): Custom validation method to ensure common insurances between patient and seminarist.

    Author:
        Alvaro Olguin Armendariz    
    """

    def __init__(self, *args, **kwargs):
        """
        Constructor for SeminarInscriptionSerializer.

        Parameters:
            display (bool, optional): A boolean indicating whether to display detailed information or only IDs.

        """

        self.display = kwargs.pop('display', False)
        super().__init__(*args, **kwargs)

    seminar = serializers.SerializerMethodField()
    patient = serializers.SerializerMethodField()
    insurance = serializers.SerializerMethodField()
    payment_method = serializers.SerializerMethodField()
    seminar_status = serializers.SerializerMethodField()
    payment_status = serializers.SerializerMethodField()
    created_by = serializers.SerializerMethodField()

    def get_seminar(self, obj):
        """
        Get the ID or name of the associated seminar.

        Parameters:
            obj (SeminarInscription): The SeminarInscription instance.

        Returns:
            int or str: The ID or name of the associated seminar, based on the 'display' attribute.

        """

        if self.display:
            return str(obj.seminar.name)
        else:
            return obj.seminar.id

    def get_patient(self, obj):
        """
        Get the ID or string representation of the associated patient.

        Parameters:
            obj (SeminarInscription): The SeminarInscription instance.

        Returns:
            int or str: The ID or string representation of the associated patient, based on 'display'.

        """

        if self.display:
            return str(obj.patient)
        else:
            return obj.patient.id

    def get_insurance(self, obj):
        """
        Get the ID or string representation of the associated insurance.

        Parameters:
            obj (SeminarInscription): The SeminarInscription instance.

        Returns:
            int, str, or None: The ID or string representation of the associated insurance, based on 'display'.

        """

        if self.display and obj.insurance is not None:
            return str(obj.insurance)
        elif obj.insurance is not None:
            return obj.insurance.id
        else:
            return None

    def get_payment_method(self, obj):
        """
        Get the ID or string representation of the associated payment method.

        Parameters:
            obj (SeminarInscription): The SeminarInscription instance.

        Returns:
            int, str, or None: The ID or string representation of the associated payment method, based on 'display'.

        """

        if self.display and obj.payment_method is not None:
            return str(obj.payment_method)
        elif obj.payment_method is not None:
            return obj.payment_method.id
        else:
            return None

    def get_seminar_status(self, obj):
        """
        Get the status of the associated seminar.

        Parameters:
            obj (SeminarInscription): The SeminarInscription instance.

        Returns:
            int or str: The status of the associated seminar, based on 'display'.

        """

        if self.display:
            return obj.get_seminar_status_display()
        else:
            return obj.seminar_status

    def get_payment_status(self, obj):
        """
        Get the payment status.

        Parameters:
            obj (SeminarInscription): The SeminarInscription instance.

        Returns:
            int or str: The payment status, based on 'display'.

        """
        if self.display:
            return obj.get_payment_status_display()
        else:
            return obj.payment_status

    def get_created_by(self, obj):
        """
        Get the ID or string representation of the creator.

        Parameters:
            obj (SeminarInscription): The SeminarInscription instance.

        Returns:
            int, str, or None: The ID or string representation of the creator, based on 'display'.

        """

        if self.display and obj.created_by is not None:
            return str(obj.created_by)
        elif obj.created_by is not None:
            return obj.created_by.id
        else:
            return None

    def to_representation(self, instance):
        """
        Custom representation method to remove decimal .00 from copayment values.

        Parameters:
            instance (SeminarInscription): The SeminarInscription instance.

        Returns:
            dict: The modified representation of the SeminarInscription instance.

        """

        rep = super().to_representation(instance)
        for field in ['patient_copayment', 'hi_copayment']:
            value = rep[field]
            if value.endswith('.00'):
                rep[field] = value[:-3]
        return rep

    class Meta:
        model = SeminarInscription
        fields = ['id', 'seminar', 'patient', 'meetingNumber', 'seminar_status',
                  'insurance', 'patient_copayment', 'hi_copayment', 'payment_method', 'payment_status', 'created_at', 'updated_at', 'created_by']

    def validate(self, data):

        if 'insurance' in data and data['insurance'] is not None:
            return data
        # Accessing the insurances of the patient
        patient_insurances = set(data['patient'].insurances.all())
        print(patient_insurances)
        # Accessing the insurances of the seminarist associated with the seminar
        seminarist_insurances = set(
            data['seminar'].seminarist.first().insurances.all())
        print(seminarist_insurances)
        # Finding common insurances
        common_insurances = patient_insurances.intersection(
            seminarist_insurances)

        print("comunes", common_insurances)
        if not common_insurances:
            raise serializers.ValidationError(
                "No common insurances found between patient and seminarist.")
        common_insurance_ids = {
            insurance.id for insurance in common_insurances}

        # Filtrando los planes de seguro del seminarista que están en los seguros comunes
        common_insurances_plans = InsurancePlanSeminarist.objects.filter(
            insurance__id__in=common_insurance_ids)

        # Encontrando el plan de seguro con la mayor cobertura
        highest_coverage_plan = max(
            common_insurances_plans, key=lambda plan: plan.coverage, default=None)

        if highest_coverage_plan is None:
            raise serializers.ValidationError(
                "No valid insurance with coverage found.")

        # Asignando el ID del seguro con la mayor cobertura
        data['insurance'] = highest_coverage_plan.insurance
        print(data)
        return data


class SeminarSerializer(serializers.ModelSerializer):
    """
    Serializer class for handling Seminar model instances.

    This serializer provides representation and validation logic for Seminar objects.

    Attributes:
        display (bool): A boolean indicating whether to display detailed information or only IDs.

    Methods:
        get_rooms(obj): Returns the IDs or names of associated rooms, based on the 'display' attribute.
        get_seminarist(obj): Returns the IDs or string representations of associated seminarists, based on 'display'.
        get_schedule(obj): Returns the IDs or string representations of associated schedules, based on 'display'.
        get_patients(obj): Returns the IDs or string representations of associated patients, based on 'display'.
        validate_year(value): Custom validation method for the 'year' field.
        validate_meetingNumber(value): Custom validation method for the 'meetingNumber' field.
        validate_maxInscription(value): Custom validation method for the 'maxInscription' field.
        validate_price(value): Custom validation method for the 'price' field.
        to_representation(instance): Custom representation method to remove decimal .00 from the 'price' field.

    Author:
        Alvaro Olguin Armendariz.    
    """

    def __init__(self, *args, **kwargs):
        """
        Constructor for SeminarSerializer.

        Parameters:
            display (bool, optional): A boolean indicating whether to display detailed information or only IDs.

        """

        self.display = kwargs.pop('display', False)
        super().__init__(*args, **kwargs)

    rooms = serializers.SerializerMethodField()
    seminarist = serializers.SerializerMethodField()
    schedule = serializers.SerializerMethodField()
    patients = serializers.SerializerMethodField()

    class Meta:
        model = Seminar
        fields = [
            'id', 'name', 'month', 'year', 'schedule', 'meetingNumber',
            'rooms', 'maxInscription', 'price', 'is_active', 'seminarist', 'patients'
        ]

    def get_rooms(self, obj):
        """
        Get the IDs or names of associated rooms.

        Parameters:
            obj (Seminar): The Seminar instance.

        Returns:
            list: The IDs or names of associated rooms, based on the 'display' attribute.

        """

        if self.display:
            return [str(room) for room in obj.rooms.all()]
        else:
            return [room.id for room in obj.rooms.all()]

    def get_seminarist(self, obj):
        """
        Get the IDs or string representations of associated seminarists.

        Parameters:
            obj (Seminar): The Seminar instance.

        Returns:
            list: The IDs or string representations of associated seminarists, based on 'display'.

        """

        if self.display:
            return [str(seminarist) for seminarist in obj.seminarist.all()]
        else:
            return [seminarist.id for seminarist in obj.seminarist.all()]

    def get_schedule(self, obj):
        """
        Get the IDs or string representations of associated schedules.

        Parameters:
            obj (Seminar): The Seminar instance.

        Returns:
            list: The IDs or string representations of associated schedules, based on 'display'.

        """

        if self.display:
            schedules = SeminarSchedule.objects.filter(seminar=obj)
            return [str(schedule) for schedule in schedules]
        else:
            return [schedule.id for schedule in obj.schedule.all()]

    def get_patients(self, obj):
        """
        Get the IDs or string representations of associated patients.

        Parameters:
            obj (Seminar): The Seminar instance.

        Returns:
            list: The IDs or string representations of associated patients, based on 'display'.

        """

        if self.display:
            return [str(patient) for patient in obj.patients.all()]
        else:
            return [patient.id for patient in obj.patients.all()]

    def validate_year(self, value):
        """
        Custom validation method for the 'year' field.

        Parameters:
            value (int): The 'year' value to be validated.

        Returns:
            int: The validated 'year' value.

        Raises:
            serializers.ValidationError: If the 'year' is outside the valid range.

        """
        current_year = datetime.now().year
        if value < 2000 or value > current_year + 10:
            raise serializers.ValidationError(
                f"El año debe estar entre 2000 y {current_year + 10}.")
        return value

    def validate_meetingNumber(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "El número de reuniones debe ser un valor positivo.")
        return value

    def validate_maxInscription(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "El número máximo de inscripciones no puede ser negativo.")
        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "El precio debe ser un valor positivo.")
        return value

    def to_representation(self, instance):
        """
        Custom representation method to remove decimal .00 from the 'price' field.

        Parameters:
            instance (Seminar): The Seminar instance.

        Returns:
            dict: The modified representation of the Seminar instance.

        """

        rep = super().to_representation(instance)
        price = rep['price']
        if price.endswith('.00'):
            rep['price'] = price[:-3]
        return rep
