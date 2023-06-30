from rest_framework import serializers 
from apps.users.api.serializers import UserShortSerializer
from apps.usersProfile.models import (HealthInsurance,MedicalSpeciality,DoctorProfile,
                                      DoctorSchedule, InsurancePlan,PatientProfile)

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

class InsurancePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsurancePlan
        fields = '__all__'


class DoctorProfileSerializer(serializers.ModelSerializer):
    user= UserShortSerializer()
    specialty = MedicalSpecialitySerializer(many=True, read_only=True)
    insurances = serializers.SerializerMethodField()
    schedules = DoctorScheduleSerializer(many=True, read_only=True)

    class Meta:
        model = DoctorProfile
        fields = '__all__'
    
    def get_insurances(self, obj):
        
        insurance_plans = InsurancePlan.objects.filter(doctor=obj)
        return InsurancePlanSerializer(insurance_plans, many=True).data

class PatientProfileSerializer(serializers.ModelSerializer):
    user= UserShortSerializer()
    insurances = HealthInsuranceSerializer(many=True, read_only=True)

    class Meta:
        model = PatientProfile
        fields = '__all__'