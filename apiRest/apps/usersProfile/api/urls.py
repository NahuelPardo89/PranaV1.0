from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (HealthInsuranceAdminViewSet, MedicalSpecialityAdminViewSet, 
                    DoctorProfileAdminViewSet, DoctorScheduleAdminViewSet, 
                    InsurancePlanDoctorAdminViewSet,InsurancePlanPatientAdminViewSet, PatientProfileAdminViewSet, DoctorUserViewSet,PatientUserViewSet)

routerAdmin = DefaultRouter()
routerAdmin.register(r'health-insurances', HealthInsuranceAdminViewSet, basename='health-insurances')
routerAdmin.register(r'doctor-specialities', MedicalSpecialityAdminViewSet, basename='medical-specialities')
routerAdmin.register(r'doctor', DoctorProfileAdminViewSet, basename='doctor-profiles')
routerAdmin.register(r'doctor-schedules', DoctorScheduleAdminViewSet, basename='doctor-schedules')
routerAdmin.register(r'insurance-plans-doctor', InsurancePlanDoctorAdminViewSet, basename='insurance-plans-doctor')
routerAdmin.register(r'insurance-plans-patient', InsurancePlanPatientAdminViewSet, basename='insurance-plans-patient')
routerAdmin.register(r'patient', PatientProfileAdminViewSet, basename='patient-profiles')




urlpatterns = [
    path('admin/', include(routerAdmin.urls)),
    path('doctor/', DoctorUserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})),
    path('patient/', PatientUserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})),
]