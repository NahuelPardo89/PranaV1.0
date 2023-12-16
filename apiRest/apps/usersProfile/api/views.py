from django.shortcuts import get_object_or_404
from django.http import Http404, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from django.db.models import Q
from apps.appointments.models import Appointment

from rest_framework import viewsets, permissions, status, generics, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, filters
from rest_framework.views import APIView


from apps.usersProfile.models import (HealthInsurance, MedicalSpeciality,  DoctorProfile,
                                      DoctorSchedule, InsurancePlanDoctor, InsurancePlanPatient,
                                      PatientProfile, SpecialityBranch)

from .serializers import (HealthInsuranceSerializer,      MedicalSpecialitySerializer, InsurancePlanDoctorSerializer,
                          DoctoListProfileSerializer,        DoctorScheduleSerializer,    PatientListProfileSerializer,
                          InsurancePlanPatientSerializer,InsurancePlanPatientListSerializer, DoctorProfileAllSerializer,  PatientShortProfileSerializer,
                          DoctorProfileShortSerializer,   SpecialityBranchListSerializer,SpecialityBranchCreateSerializer,DoctorCreateUpdateProfileSerializer)

from apps.permission import IsAdminOrReadOnly

# ADMIN VIEWS


class BaseAdminViewSet(viewsets.GenericViewSet):
    """ BASE ADMIN VIEWSET """
    permission_classes = [IsAdminOrReadOnly, ]

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter()
        return self.queryset

    def list(self, request):
        instances = self.get_queryset()
        instances_serializer = self.serializer_class(instances, many=True)
        return Response(instances_serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        instance_serializer = self.serializer_class(data=request.data)
        if instance_serializer.is_valid():
            instance = instance_serializer.save()
            return Response({
                'message': 'Profile creado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro de Profile',
            'errors': instance_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        instance = self.get_object(pk)
        instance_serializer = self.serializer_class(instance)
        return Response(instance_serializer.data)

    def update(self, request, pk=None):
        
        instance = self.get_object(pk)
        instance_serializer = self.serializer_class(
            instance, data=request.data)
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
        instance_destroy = self.model.objects.filter(
            id=pk).update(is_active=False)
        if instance_destroy == 1:
            return Response({
                'message': 'Profile eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT
            )
        return Response({
            'message': 'No existe el Profile que desea eliminar'
        }, status=status.HTTP_404_NOT_FOUND)


class HealthInsuranceAdminViewSet(BaseAdminViewSet):
    model=HealthInsurance
    serializer_class = HealthInsuranceSerializer
    permission_classes = [IsAdminOrReadOnly]


class DoctorPatientCommonInsurancesView(APIView):
    """
    API view to get the common health insurances for a given doctor, patient, and branch.
    """

    def get(self, request):
        # Parameters
        doctor_id = request.GET.get('doctor_id')
        patient_id = request.GET.get('patient_id')
        branch_id = request.GET.get('branch_id')

        # Filter the id's of the common health insurances that cover the branch
        common_insurances_ids = InsurancePlanDoctor.objects.filter(doctor_id=doctor_id, branch_id=branch_id).values_list('insurance_id', flat=True).filter(
            insurance_id__in=InsurancePlanPatient.objects.filter(patient_id=patient_id).values_list('insurance_id', flat=True))

        # Get de HI
        common_insurances = HealthInsurance.objects.filter(
            id__in=common_insurances_ids)

        # Response
        serializer = HealthInsuranceSerializer(common_insurances, many=True)

        return Response(serializer.data)


class MedicalSpecialityAdminViewSet(BaseAdminViewSet):
    model=MedicalSpeciality
    serializer_class = MedicalSpecialitySerializer
    permission_classes = [IsAdminOrReadOnly]


class SpecialityBranchAdminViewSet(BaseAdminViewSet):
    model=SpecialityBranch
    serializer_class = SpecialityBranchListSerializer
    create_serializer_class=SpecialityBranchCreateSerializer
    permission_classes = [IsAdminOrReadOnly]

    def create(self, request):
    
        instance_serializer = self.create_serializer_class(data=request.data)
        if instance_serializer.is_valid():
            instance = instance_serializer.save()
            return Response({
                'message': 'Profile creado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro de Profile',
            'errors': instance_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class DoctorBranchesView(APIView):
    """
    API view to get the branches for a given doctor.
    """

    def get(self, request):
        doctor_id = request.GET.get('doctor_id')

        # Filtra los planes de seguro del doctor
        doctor_insurances = InsurancePlanDoctor.objects.filter(
            doctor_id=doctor_id)

        # Obtiene las ramas
        doctor_branches = list(
            set(insurance.branch for insurance in doctor_insurances))

        # Serializa la respuesta
        serializer = SpecialityBranchSerializer(doctor_branches, many=True)

        return Response(serializer.data)


class DoctorScheduleAdminViewSet(viewsets.ModelViewSet):
    queryset = DoctorSchedule.objects.all()
    serializer_class = DoctorScheduleSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['doctor__id']

    def get_queryset(self):
        doctor_id = self.request.query_params.get('doctor_id')
        if doctor_id:
            return DoctorSchedule.objects.filter(doctor=doctor_id)
        return DoctorSchedule.objects.all()


class DoctorScheduleAvailableTimesView(APIView):
    """
    API view to get available times for a specific doctor on a given date.

    This view takes a doctor's ID and a date as input and returns a list of available time slots
    based on the doctor's schedule and existing appointments for that day.

    Args:
        doctor_id (int): The ID of the doctor for whom available times are requested.
        date (str): The date in the format "YYYY-MM-DD".

    Returns:
        JsonResponse: A JSON response containing a list of available time slots for appointments.

    Raises:
        Http404: If the doctor with the given ID is not found.
        Http404: If the doctor's schedule for the specified day is not found.

    Methods:
        get(self, request, doctor_id, date): Handles HTTP GET requests to retrieve available times.
    """

    def get(self, request, doctor_id, date):
        # Get a specific doctor
        try:
            doctor = DoctorProfile.objects.get(id=doctor_id)
        except DoctorProfile.DoesNotExist:
            return JsonResponse({'error': 'Profesional no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        # Convert the date string to a datetime object
        date = datetime.strptime(date, "%Y-%m-%d")

        # Get the day of the week in English and take the first 3 letters
        day = date.strftime("%a").lower()

        # Get the schedule
        schedules = DoctorSchedule.objects.filter(doctor=doctor, day=day)
        if not schedules:
            return JsonResponse({'error': 'El profesional no tiene asignado un horario de trabajo en el día indicado'}, status=status.HTTP_404_NOT_FOUND)

        # Get the doctor appointment duration
        duration_minutes = doctor.appointment_duration
        available_times = []

        # Get existing appointments for the doctor on the given date
        appointments = Appointment.objects.filter(doctor=doctor, day=date)

        # Get the current time
        now = datetime.now().time()

        # Loop schedules and construct the availables times
        for schedule in schedules:
            start_time = datetime.combine(date, schedule.start)
            end_time = datetime.combine(date, schedule.end)

            while start_time.time() < end_time.time():
                end_time_slot = start_time + duration_minutes

                # Check if there is an existing appointment during this time slot
                if not appointments.filter(Q(hour__gte=start_time.time(), hour__lt=end_time_slot.time()) | Q(hour__lte=start_time.time(), hour__gt=end_time_slot.time())).exists():
                    # Check if the start time is not in the past
                    if date.date() > datetime.today().date() or start_time.time() >= now:
                        available_times.append(
                            f"{start_time.time().strftime('%H:%M:%S')} - {end_time_slot.time().strftime('%H:%M:%S')}")

                start_time = end_time_slot

        return JsonResponse({'available_times': available_times}, status=status.HTTP_200_OK)


class InsurancePlanPatientAdminViewSet(BaseAdminViewSet):
    model=InsurancePlanPatient
    serializer_class = InsurancePlanPatientListSerializer
    create_serializer_class= InsurancePlanPatientSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def create(self, request):
        print(request.data)
        instance_serializer = self.create_serializer_class(data=request.data)
        if instance_serializer.is_valid():
            instance = instance_serializer.save()
            return Response({
                'message': 'Profile creado correctamente.'
            }, status=status.HTTP_201_CREATED)
        else:
            errors = instance_serializer.errors
            # Comprobar si existe el error de campos únicos
            if 'non_field_errors' in errors and errors['non_field_errors']:
                if "Los campos patient, insurance deben formar un conjunto único." in errors['non_field_errors']:
                    return Response({
                        'message': 'Ya existe la Obra Social para ese Paciente'
                    }, status=status.HTTP_400_BAD_REQUEST)

            # Respuesta genérica para otros errores
            return Response({
                'message': 'Hay errores en el registro de Profile',
                'errors': errors
            }, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            instance_to_destroy = self.get_object(pk)
            instance_to_destroy.delete()
            return Response({
                'message': 'Profile eliminado correctamente'
            }, status=status.HTTP_204_NO_CONTENT)
        except self.model.DoesNotExist:
            return Response({
                'message': 'No existe el Profile que desea eliminar'
            }, status=status.HTTP_404_NOT_FOUND)


class InsurancePlanDoctorAdminViewSet(viewsets.ModelViewSet):
    queryset = InsurancePlanDoctor.objects.all()
    serializer_class = InsurancePlanDoctorSerializer
    permission_classes = [IsAdminOrReadOnly]


class PatientProfileAdminViewSet(BaseAdminViewSet):
    model = PatientProfile
    serializer_class = PatientListProfileSerializer
    update_serializer_class=PatientShortProfileSerializer
    queryset = None
    def update(self, request, pk=None):
        
        instance = self.get_object(pk)
        instance_serializer = self.update_serializer_class(
            instance, data=request.data)
        if instance_serializer.is_valid():
            instance_serializer.save()
            return Response({
                'message': 'Profile actualizado correctamente'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Hay errores en la actualización',
            'errors': instance_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class DoctorProfileAdminViewSet(BaseAdminViewSet):
    model = DoctorProfile
    serializer_class = DoctoListProfileSerializer
    createUpdate_serializer_class= DoctorCreateUpdateProfileSerializer
    queryset = None

    def get_queryset(self):
        queryset = super().get_queryset()
        speciality = self.request.query_params.get('speciality', None)
        if speciality is not None:
            queryset = queryset.filter(specialty__name=speciality)
        return queryset
    
    def update(self, request, pk=None):
        
        instance = self.get_object(pk)
        instance_serializer = self.createUpdate_serializer_class(
            instance, data=request.data)
        if instance_serializer.is_valid():
            instance_serializer.save()
            return Response({
                'message': 'Profile actualizado correctamente'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Hay errores en la actualización',
            'errors': instance_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    def partial_update(self, request, pk=None):
        
        instance = self.get_object(pk)
        serializer = self.createUpdate_serializer_class(instance, data=request.data, partial=True) # partial=True permite la actualización parcial
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def create(self, request):
        print(request.data)
        instance_serializer = self.createUpdate_serializer_class(data=request.data)
        if instance_serializer.is_valid():
            instance = instance_serializer.save()
            return Response({
                'message': 'Profile creado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro de Profile',
            'errors': instance_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

# NORMAL USERS VIEWSETS


class DoctorUserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    serializer_class = DoctorProfileShortSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            return self.request.user.doctorProfile
        except ObjectDoesNotExist:
            raise Http404(
                "No existe un perfil de Profesional para el usuario autenticado.")


class PatientUserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    serializer_class = PatientShortProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            return self.request.user.patientProfile
        except ObjectDoesNotExist:
            raise Http404(
                "No existe un perfil de paciente para el usuario autenticado.")
