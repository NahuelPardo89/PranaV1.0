from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (HealthInsuranceAdminViewSet, MedicalSpecialityAdminViewSet,
                    DoctorProfileAdminViewSet, DoctorScheduleAdminViewSet,
                    InsurancePlanDoctorAdminViewSet, InsurancePlanPatientAdminViewSet,
                    PatientProfileAdminViewSet, DoctorUserViewSet, PatientUserViewSet,
                    SpecialityBranchAdminViewSet, DoctorScheduleAvailableTimesView,
                    DoctorPatientCommonInsurancesView, DoctorBranchesView,)

routerAdmin = DefaultRouter()
routerAdmin.register(r'health-insurances',
                     HealthInsuranceAdminViewSet, basename='health-insurances')
routerAdmin.register(
    r'specialities', MedicalSpecialityAdminViewSet, basename='medical-specialities')
routerAdmin.register(r'speciality-branch',
                     SpecialityBranchAdminViewSet, basename='speciality-branch')
routerAdmin.register(r'doctor', DoctorProfileAdminViewSet,
                     basename='doctor-profiles')
routerAdmin.register(r'doctor-schedules',
                     DoctorScheduleAdminViewSet, basename='doctor-schedules')
routerAdmin.register(r'insurance-plans-doctor',
                     InsurancePlanDoctorAdminViewSet, basename='insurance-plans-doctor')
routerAdmin.register(r'insurance-plans-patient',
                     InsurancePlanPatientAdminViewSet, basename='insurance-plans-patient')
routerAdmin.register(r'patient', PatientProfileAdminViewSet,
                     basename='patient-profiles')


urlpatterns = [
    path('admin/', include(routerAdmin.urls)),
    path('admin/doctor-available-times/<int:doctor_id>/<str:date>/',
         DoctorScheduleAvailableTimesView.as_view(), name='available-times'),
    path('admin/common-insurances/',
         DoctorPatientCommonInsurancesView.as_view(), name='common-insurances'),
    path('admin/doctor-branches/',
         DoctorBranchesView.as_view(), name='doctor-branches'),
    path('doctor/', DoctorUserViewSet.as_view(
        {'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})),
    path('patient/', PatientUserViewSet.as_view(
        {'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})),
]
