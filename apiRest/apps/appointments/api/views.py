from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions, viewsets
from apps.appointments.api.serializers import AppointmentSerializer, AppointmentSerializerList, PaymentMethodSerializer, PatientAppointmentSerializer, DoctorAppointmentSerializer
from apps.usersProfile.models import PatientProfile
from apps.appointments.models import Appointment, PaymentMethod


class IsAdminOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_staff


class AppointmentListCreateView(APIView):
    """
    API view for listing and creating appointments.
    """
    permission_classes = [IsAdminOrReadOnly, ]

    def get(self, request):
        """
        Retrieve a list of appointments filtered by state | doctor | day.
        """
        # Find the params
        appointment_status = request.query_params.get('appointment_status')
        payment_status = request.query_params.get('payment_status')
        doctor_id = request.query_params.get('doctor_id')
        day = request.query_params.get('day')

        appointments = Appointment.objects.all()

        # Filter appointments
        if appointment_status:
            appointments.filter(appointment_status=appointment_status)
        if payment_status:
            appointments.filter(payment_status=payment_status)
        if doctor_id:
            appointments.filter(doctor=doctor_id)
        if day:
            appointments.filter(day=day)

        appointments = appointments.order_by('-day', 'hour')

        serializer = AppointmentSerializerList(appointments, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Create a new appointment.
        """
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AppointmentDetailView(APIView):
    """
    API view for retrieving, updating, and deleting an appointment.
    """
    # permission_classes = [permissions.IsAuthenticated, ]

    def get_object(self, pk):
        """
        Get the appointment object for the given primary key.
        """
        try:
            return Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        """
        Retrieve an appointment.
        """
        appointment = self.get_object(pk)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Update an appointment.
        """
        appointment = self.get_object(pk)
        serializer = AppointmentSerializer(appointment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete an appointment.
        """
        appointment = self.get_object(pk)
        appointment.delete()
        return Response({
            'message': 'Turno cancelado correctamente'
        }, status=status.HTTP_204_NO_CONTENT)


class PaymentMethodListCreateView(generics.ListCreateAPIView):
    """
    API view for listing payment methods.
    """
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer


class PaymentMethodRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for updating, and deleting a payment method.
    """
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer


class PatientAppointmentsView(viewsets.GenericViewSet):
    """
    API view for listing appointments for the currently authenticated patient.
    """
    model = Appointment
    queryset = None
    serializer_class = PatientAppointmentSerializer
    serializer_class_list = AppointmentSerializerList
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Define the appointments for the currently authenticated patient.
        """
        try:
            patient = self.request.user.patientProfile
            day = self.request.query_params.get('day', None)
            if day is not None:
                return Appointment.objects.filter(patient=patient, appointment_status=1, day=day).order_by('-day', 'hour')
            else:
                return Appointment.objects.filter(patient=patient).order_by('-day', 'hour')
        except PatientProfile.DoesNotExist:
            raise Http404()

    def list(self, request):
        """
        Get the list of appointments for the currently authenticated patient.
        """
        instances = self.get_queryset()
        instances_serializer = self.serializer_class_list(instances, many=True)
        return Response(instances_serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """
        Create a new appointment for currently authenticated patient.
        """
        # Since the view does not allow access to certain fields, they must be added inside the create method
        request.data['patient'] = request.user.patientProfile.id
        instance_serializer = self.serializer_class(data=request.data)
        if instance_serializer.is_valid():
            instance_serializer.save()
            return Response({
                'message': 'Turno creado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro de Turno',
            'errors': instance_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """
        Retrieve a specific appointment for the patient.
        """
        instance = self.get_object(pk)
        instance_serializer = self.serializer_class(instance)
        return Response(instance_serializer.data)

    def destroy(self, request, pk=None):
        """
        Cancel an appointment for the patient.
        """
        instance = self.get_object()
        instance.delete()

        return Response({
            'message': 'Turno cancelado correctamente'
        }, status=status.HTTP_204_NO_CONTENT)


class DoctorAppointmentListView(APIView):
    """
    API view for listing a doctor appointments.
    """
    model = Appointment
    serializer_class = DoctorAppointmentSerializer
    serializer_class_list = AppointmentSerializerList
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request):
        """
        Retrieve a list of appointments filtered by state.
        """
        doctor = self.request.user.doctorProfile
        day = request.query_params.get('day', None)
        if day is not None:
            appointments = Appointment.objects.filter(
                doctor=doctor,
                day=day,
            ).order_by('-day', 'hour')
        else:
            appointments = Appointment.objects.filter(
                doctor=doctor,
            ).order_by('-day', 'hour')
        serializer = self.serializer_class_list(appointments, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Create a new appointment.
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorAppointmentDetailView(APIView):
    """
    API view for retrieving, updating, and deleting an appointment.
    """
    model = Appointment
    serializer_class = DoctorAppointmentSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get_object(self, pk):
        """
        Get the appointment object for the given primary key.
        """
        try:
            return Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        """
        Retrieve an appointment.
        """
        appointment = self.get_object(pk)
        serializer = DoctorAppointmentSerializer(appointment)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Update an appointment.
        """
        appointment = self.get_object(pk)
        request.data['doctor'] = self.request.user.doctorProfile.id
        request.data['patient'] = appointment.patient.id
        serializer = DoctorAppointmentSerializer(
            appointment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete an appointment.
        """
        appointment = self.get_object(pk)
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
