from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import viewsets,permissions,status,generics,mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets



from apps.usersProfile.models import (HealthInsurance,MedicalSpeciality,  DoctorProfile, 
                                      DoctorSchedule, InsurancePlanDoctor,InsurancePlanPatient, 
                                      PatientProfile, SpecialityBranch)
                                      
from .serializers import (HealthInsuranceSerializer,      MedicalSpecialitySerializer, InsurancePlanDoctorSerializer,
                          DoctorProfileSerializer,        DoctorScheduleSerializer,    PatientProfileSerializer,
                          InsurancePlanPatientSerializer, DoctorProfileAllSerializer,  PatientShortProfileSerializer,
                          DoctorProfileShortSerializer,   SpecialityBranchSerializer)

class IsAdminOrReadOnly(permissions.BasePermission):
  
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return request.user.is_staff
#testearr
class IsDoctorOrReadOnly(permissions.BasePermission):
  
    def has_permission(self, request, view):
        
        if request.method in permissions.SAFE_METHODS:
            return True        
        elif request.user.doctorProfile:
            return True
        else:
            return request.user.is_staff

#ADMIN VIEWS
class BaseAdminViewSet(viewsets.GenericViewSet):
    """ BASE ADMIN VIEWSET """
    #permission_classes = [IsAdminOrReadOnly, ]
    
    def get_object(self, pk):
        return get_object_or_404(self.model,pk=pk)
     
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter(is_active=True)
        return self.queryset
    
    def list(self, request):
        instances = self.get_queryset()
        instances_serializer = self.serializer_class(instances, many=True)
        return Response(instances_serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        instance_serializer = self.serializer_class(data=request.data)
        if instance_serializer.is_valid():
            instance=instance_serializer.save()
            return Response({
                'message': 'Profile creado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro de Profile',
            'errors':instance_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        instance= self.get_object(pk)
        instance_serializer = self.serializer_class(instance)
        return Response(instance_serializer.data)
    
    def update(self, request, pk=None):
        instance = self.get_object(pk)
        instance_serializer = self.serializer_class(instance, data=request.data)
        if instance_serializer.is_valid():
            instance_serializer.save()
            return Response({
                'message': 'Profile actualizado correctamente'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Hay errores en la actualización',
            'errors': instance_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        instance_destroy = self.model.objects.filter(id=pk).update(is_active=False)
        if instance_destroy == 1:
            return Response({
                'message': 'Profile eliminado correctamente'},status=status.HTTP_204_NO_CONTENT
            )
        return Response({
            'message': 'No existe el Profile que desea eliminar'
        }, status=status.HTTP_404_NOT_FOUND)
                 

class HealthInsuranceAdminViewSet(viewsets.ModelViewSet):
    queryset = HealthInsurance.objects.all()
    serializer_class = HealthInsuranceSerializer
    permission_classes = [IsAdminOrReadOnly]

class MedicalSpecialityAdminViewSet(viewsets.ModelViewSet):
    queryset = MedicalSpeciality.objects.all()
    serializer_class = MedicalSpecialitySerializer
    #permission_classes = [IsAdminOrReadOnly]
    
class SpecialityBranchAdminViewSet(viewsets.ModelViewSet):
    queryset = SpecialityBranch.objects.all()
    serializer_class = SpecialityBranchSerializer
    #permission_classes = [IsAdminOrReadOnly]

class DoctorScheduleAdminViewSet(viewsets.ModelViewSet):
    queryset = DoctorSchedule.objects.all()
    serializer_class = DoctorScheduleSerializer
    permission_classes = [IsAdminOrReadOnly]

class InsurancePlanPatientAdminViewSet(viewsets.ModelViewSet):
    queryset = InsurancePlanPatient.objects.all()
    serializer_class = InsurancePlanPatientSerializer
    permission_classes = [IsAdminOrReadOnly]

class InsurancePlanDoctorAdminViewSet(viewsets.ModelViewSet):
    queryset = InsurancePlanDoctor.objects.all()
    serializer_class = InsurancePlanDoctorSerializer
    permission_classes = [IsAdminOrReadOnly]

class PatientProfileAdminViewSet(BaseAdminViewSet):
    model = PatientProfile
    serializer_class = PatientProfileSerializer
    queryset = None

class DoctorProfileAdminViewSet(BaseAdminViewSet):
    model = DoctorProfile
    serializer_class = DoctorProfileSerializer
    queryset = None
    
    def get_queryset(self):
        queryset = super().get_queryset()
        speciality = self.request.query_params.get('speciality', None)
        if speciality is not None:
            queryset = queryset.filter(specialty__name=speciality)
        return queryset

#NORMAL USERS VIEWSETS
class DoctorUserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    serializer_class = DoctorProfileShortSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            return self.request.user.doctorProfile
        except ObjectDoesNotExist:
            raise Http404("No existe un perfil de Profesional para el usuario autenticado.")


class PatientUserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    serializer_class = PatientShortProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            return self.request.user.patientProfile
        except ObjectDoesNotExist:
            raise Http404("No existe un perfil de paciente para el usuario autenticado.")