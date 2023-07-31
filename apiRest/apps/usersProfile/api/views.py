from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import viewsets,permissions,status,generics,mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets



from apps.usersProfile.models import (HealthInsurance, MedicalSpeciality, DoctorProfile, 
                                    DoctorSchedule, InsurancePlanDoctor,InsurancePlanPatient, PatientProfile)
from .serializers import (HealthInsuranceSerializer, MedicalSpecialitySerializer, InsurancePlanDoctorSerializer,
                          DoctorProfileSerializer, DoctorScheduleSerializer, PatientProfileSerializer,
                          InsurancePlanPatientSerializer, DoctorProfileAllSerializer,PatientShortProfileSerializer,
                          DoctorProfileShortSerializer)
                          
#ADMINS VIEWS
class HealthInsuranceAdminViewSet(viewsets.ModelViewSet):
    queryset = HealthInsurance.objects.all()
    serializer_class = HealthInsuranceSerializer

class MedicalSpecialityAdminViewSet(viewsets.ModelViewSet):
    queryset = MedicalSpeciality.objects.all()
    serializer_class = MedicalSpecialitySerializer

class DoctorScheduleAdminViewSet(viewsets.ModelViewSet):
    queryset = DoctorSchedule.objects.all()
    serializer_class = DoctorScheduleSerializer

class InsurancePlanPatientAdminViewSet(viewsets.ModelViewSet):
    queryset = InsurancePlanPatient.objects.all()
    serializer_class = InsurancePlanPatientSerializer

class InsurancePlanDoctorAdminViewSet(viewsets.ModelViewSet):
    queryset = InsurancePlanDoctor.objects.all()
    serializer_class = InsurancePlanDoctorSerializer

class PatientProfileAdminViewSet(viewsets.ModelViewSet):
    queryset = PatientProfile.objects.filter(is_active=True)
    serializer_class = PatientProfileSerializer
    
    def destroy(self, request, *args, **kwargs):
        patient_profile = self.get_object()
        patient_profile.is_active = False
        patient_profile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DoctorProfileAdminViewSet(viewsets.GenericViewSet):
    model = DoctorProfile
    serializer_class = DoctorProfileSerializer
    #permission_classes = [permissions.IsAdminUser, ]
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter(is_active=True)
        return self.queryset
    
    def list(self, request):
        doctors = self.get_queryset()
        doctors_serializer = self.serializer_class(doctors, many=True)
        return Response(doctors_serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        doctor_serializer = self.serializer_class(data=request.data)
        if doctor_serializer.is_valid():
            doctor=doctor_serializer.save()
            doctor.is_active=True
            doctor.save()
            return Response({
                'message': 'Profesional creado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro de profesional',
            'errors':doctor_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        doctor = self.get_object(pk)
        doctor_serializer = self.serializer_class(doctor)
        return Response(doctor_serializer.data)
    
    def update(self, request, pk=None):
        doctor = self.get_object(pk)
        doctor_serializer = self.serializer_class(doctor, data=request.data)
        if doctor_serializer.is_valid():
            doctor_serializer.save()
            return Response({
                'message': 'Profesional actualizado correctamente'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Hay errores en la actualización',
            'errors': doctor_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        doctor_destroy = self.model.objects.filter(id=pk).update(is_active=False)
        if doctor_destroy == 1:
            return Response({
                'message': 'Profesional eliminado correctamente'
            })
        return Response({
            'message': 'No existe el profesional que desea eliminar'
        }, status=status.HTTP_404_NOT_FOUND)



class DoctorUserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    serializer_class = DoctorProfileShortSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.doctorProfile

class PatientUserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    serializer_class = PatientShortProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.patientProfile