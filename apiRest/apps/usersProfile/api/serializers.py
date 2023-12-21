from rest_framework import serializers
from apps.users.api.serializers import UserShortSerializer
from apps.usersProfile.models import (HealthInsurance, MedicalSpeciality, DoctorProfile,
                                      DoctorSchedule, InsurancePlanDoctor, InsurancePlanPatient,
                                      PatientProfile, SpecialityBranch)


class HealthInsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthInsurance
        fields = '__all__'


class MedicalSpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpeciality
        fields = '__all__'

    def create(self, validated_data):
        speciality = MedicalSpeciality.objects.create(**validated_data)

        SpecialityBranch.objects.create(
            name="GENERAL",
            speciality=speciality
        )

        return speciality


class SpecialityBranchListSerializer(serializers.ModelSerializer):
    speciality = serializers.StringRelatedField()

    class Meta:
        model = SpecialityBranch
        fields = '__all__'

class SpecialityBranchCreateSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = SpecialityBranch
        fields = '__all__'


class DoctorScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorSchedule
        fields = '__all__'


class InsurancePlanDoctorListSerializer(serializers.ModelSerializer):
    doctor=serializers.StringRelatedField()
    insurance=serializers.StringRelatedField()
    branch=serializers.StringRelatedField()
    class Meta:
        model = InsurancePlanDoctor
        fields = ('id','doctor', 'insurance', 'branch', 'price')

class InsurancePlanDoctorCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = InsurancePlanDoctor
        fields = ('id','doctor', 'insurance', 'branch', 'price')


class InsurancePlanPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsurancePlanPatient
        fields = '__all__'

class InsurancePlanPatientListSerializer(serializers.ModelSerializer):
    patient=serializers.StringRelatedField()
    insurance=serializers.StringRelatedField()
    class Meta:
        model = InsurancePlanPatient
        fields = '__all__'


class DoctorProfileAllSerializer(serializers.ModelSerializer):
    user = UserShortSerializer()
    specialty = MedicalSpecialitySerializer(many=True, read_only=True)
    insurances = serializers.SerializerMethodField()
    schedules = DoctorScheduleSerializer(many=True, read_only=True)

    class Meta:
        model = DoctorProfile
        fields = '__all__'

    def get_insurances(self, obj):

        insurance_plans = InsurancePlanDoctor.objects.filter(doctor=obj)
        return InsurancePlanSerializer(insurance_plans, many=True).data


class DoctoListProfileSerializer(serializers.ModelSerializer):
    is_active = serializers.BooleanField(required=False)
    user = serializers.StringRelatedField()
    specialty = serializers.StringRelatedField(many=True)
    insurances = serializers.StringRelatedField(many=True)

    class Meta:
        model = DoctorProfile
        fields = ('id', 'user', 'medicLicence', 'specialty',
                  'insurances', 'is_active', 'appointment_duration')

class DoctorCreateUpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = ('id', 'user', 'medicLicence', 'specialty',
                  'insurances', 'is_active', 'appointment_duration')
        read_only_fields = ('insurances',)

       

class PatientListProfileSerializer(serializers.ModelSerializer):
    is_active = serializers.BooleanField(required=False)
    user = serializers.StringRelatedField(required=False)
    insurances=serializers.StringRelatedField(many=True,required=False)

    class Meta:
        model = PatientProfile
        fields = ('id', 'user', 'facebook', 'instagram',
                  'address', 'insurances', 'is_active')
        read_only_fields = ('id','user','insurances')
        
class PatientShortProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = ('id','facebook', 'instagram', 'address', 'insurances','is_active')
        read_only_fields = ('insurances',)


class InsurancePlanDoctorSerializer2(serializers.ModelSerializer):
    insurance = HealthInsuranceSerializer(read_only=True)
    branch = SpecialityBranchListSerializer(read_only=True)

    class Meta:
        model = InsurancePlanDoctor
        fields = ('insurance', 'branch', 'price')


class DoctorProfileShortSerializer(serializers.ModelSerializer):
    insurances = InsurancePlanDoctorSerializer2(many=True, read_only=True)
    specialty = serializers.StringRelatedField(many=True)

    class Meta:
        model = DoctorProfile
        fields = ('medicLicence', 'specialty', 'insurances', 'is_active')
        read_only_fields = ('is_active',)
