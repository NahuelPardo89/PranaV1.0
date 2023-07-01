from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (HealthInsuranceViewSet, MedicalSpecialityViewSet, 
                    DoctorProfileViewSet, DoctorScheduleViewSet, 
                    InsurancePlanDoctorViewSet,InsurancePlanPatientViewSet, PatientProfileViewSet)

router = DefaultRouter()
router.register(r'health-insurances', HealthInsuranceViewSet, basename='health-insurances')
router.register(r'medical-specialities', MedicalSpecialityViewSet, basename='medical-specialities')
router.register(r'doctor-profiles', DoctorProfileViewSet, basename='doctor-profiles')
router.register(r'doctor-schedules', DoctorScheduleViewSet, basename='doctor-schedules')
router.register(r'insurance-plans-doctor', InsurancePlanDoctorViewSet, basename='insurance-plans-doctor')
router.register(r'insurance-plans-patient', InsurancePlanPatientViewSet, basename='insurance-plans-patient')
router.register(r'patient-profiles', PatientProfileViewSet, basename='patient-profiles')

urlpatterns = [
    path('', include(router.urls)),
]