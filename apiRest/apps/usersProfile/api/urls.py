from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (HealthInsuranceAdminViewSet, MedicalSpecialityAdminViewSet, 
                    DoctorProfileAdminViewSet, DoctorScheduleAdminViewSet, 
                    InsurancePlanDoctorAdminViewSet,InsurancePlanPatientAdminViewSet, PatientProfileAdminViewSet, DoctorUserViewSet)

router = DefaultRouter()
router.register(r'health-insurances', HealthInsuranceAdminViewSet, basename='health-insurances')
router.register(r'doctor-specialities', MedicalSpecialityAdminViewSet, basename='medical-specialities')
router.register(r'doctor-profiles', DoctorProfileAdminViewSet, basename='doctor-profiles')
router.register(r'doctor-schedules', DoctorScheduleAdminViewSet, basename='doctor-schedules')
router.register(r'insurance-plans-doctor', InsurancePlanDoctorAdminViewSet, basename='insurance-plans-doctor')
router.register(r'insurance-plans-patient', InsurancePlanPatientAdminViewSet, basename='insurance-plans-patient')
router.register(r'patient-profiles', PatientProfileAdminViewSet, basename='patient-profiles')
router.register(r'doctor-profile', DoctorProfileAdminViewSet, basename='doctor')


urlpatterns = [
    path('', include(router.urls)),
    path('doctor/', DoctorUserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})),
]