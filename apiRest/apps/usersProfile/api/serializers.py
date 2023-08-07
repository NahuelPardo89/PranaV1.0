from rest_framework import serializers 
from apps.users.api.serializers import UserShortSerializer
from apps.usersProfile.models import (HealthInsurance,MedicalSpeciality,DoctorProfile,
                                      DoctorSchedule, InsurancePlanDoctor,InsurancePlanPatient,PatientProfile)

class HealthInsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthInsurance
        fields = '__all__'

class MedicalSpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpeciality
        fields = '__all__'

class DoctorScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorSchedule
        fields = '__all__'

class InsurancePlanDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsurancePlanDoctor
        fields = '__all__'

class InsurancePlanPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsurancePlanPatient
        fields = '__all__'


class DoctorProfileAllSerializer(serializers.ModelSerializer):
    user= UserShortSerializer()
    specialty = MedicalSpecialitySerializer(many=True, read_only=True)
    insurances = serializers.SerializerMethodField()
    schedules = DoctorScheduleSerializer(many=True, read_only=True)

    class Meta:
        model = DoctorProfile
        fields = '__all__'
    
    def get_insurances(self, obj):
        
        insurance_plans = InsurancePlanDoctor.objects.filter(doctor=obj)
        return InsurancePlanSerializer(insurance_plans, many=True).data

class DoctorProfileSerializer(serializers.ModelSerializer):
    is_active = serializers.BooleanField(required=False)

    class Meta:
        model = DoctorProfile
        fields = ('user', 'medicLicence', 'specialty', 'insurances', 'is_active','appoimentDuration')

class PatientProfileSerializer(serializers.ModelSerializer):
    is_active = serializers.BooleanField(required=False)
    class Meta:
        model = PatientProfile
        fields = ('user','facebook', 'instagram', 'address','insurances','is_active')

class PatientShortProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = ('facebook', 'instagram', 'address','insurances')
        read_only_fields = ('insurances',)

class DoctorProfileShortSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = DoctorProfile
        fields = ('medicLicence', 'specialty', 'insurances')
        read_only_fields = ('insurances','specialty')
   
   