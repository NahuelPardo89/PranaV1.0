from rest_framework import viewsets
from apps.usersProfile.models import (HealthInsurance, MedicalSpeciality, DoctorProfile, 
                                    DoctorSchedule, InsurancePlanDoctor,InsurancePlanPatient, PatientProfile)
from .serializers import (HealthInsuranceSerializer, MedicalSpecialitySerializer, 
                          DoctorProfileSerializer, DoctorScheduleSerializer, 
                          InsurancePlanDoctorSerializer,InsurancePlanPatientSerializer, PatientProfileSerializer)

class HealthInsuranceViewSet(viewsets.ModelViewSet):
    queryset = HealthInsurance.objects.all()
    serializer_class = HealthInsuranceSerializer

class MedicalSpecialityViewSet(viewsets.ModelViewSet):
    queryset = MedicalSpeciality.objects.all()
    serializer_class = MedicalSpecialitySerializer

class DoctorProfileViewSet(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer

class DoctorScheduleViewSet(viewsets.ModelViewSet):
    queryset = DoctorSchedule.objects.all()
    serializer_class = DoctorScheduleSerializer

class InsurancePlanDoctorViewSet(viewsets.ModelViewSet):
    queryset = InsurancePlanDoctor.objects.all()
    serializer_class = InsurancePlanDoctorSerializer

class InsurancePlanPatientViewSet(viewsets.ModelViewSet):
    queryset = InsurancePlanPatient.objects.all()
    serializer_class = InsurancePlanPatientSerializer




class PatientProfileViewSet(viewsets.ModelViewSet):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer