from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions, viewsets
from apps.appointments.api.serializers import AppointmentSerializer, PaymentMethodSerializer, PatientAppointmentSerializer
from apps.usersProfile.models import PatientProfile
from apps.appointments.models import Appointment, PaymentMethod


class AppointmentListCreateView(APIView):
    """
    API view for listing and creating appointments.
    """
    # permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request):
        """
        Retrieve a list of appointments.
        """
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
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
        return Response(status=status.HTTP_204_NO_CONTENT)


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


class PatientAppointmentsListView(viewsets.GenericViewSet):
    """
    API view for listing appointments for the currently authenticated patient.
    """
    model = Appointment
    queryset = None
    serializer_class = PatientAppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        # def get_object(self):
        """
        Get the list of appointments for the currently authenticated patient.
        """
        try:
            patient = self.request.user.patientProfile
            print("Paciente: ", patient)
            return Appointment.objects.filter(patient=patient)
        except PatientProfile.DoesNotExist:
            raise Http404()

    def list(self, request):
        instances = self.get_queryset()
        instances_serializer = self.serializer_class(instances, many=True)
        return Response(instances_serializer.data, status=status.HTTP_200_OK)


class PatientAppointmentDeleteView(generics.DestroyAPIView):
    """
    API view to cancel an appointment of the authenticated patient.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        patient = self.request.user.patientProfile
        return get_object_or_404(Appointment, pk=pk, patient=patient)


# class PatientAppointmentsListView(generics.ListAPIView):
#     """
#     API view for listing appointments for the currently authenticated patient.
#     """
#     queryset = None
#     serializer_class = PatientAppointmentSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):

#         # def get_object(self):
#         """
#         Get the list of appointments for the currently authenticated patient.
#         """
#         patient = self.request.user.patientProfile
#         return Appointment.objects.filter(patient=patient)


# class PatientAppointmentDeleteView(generics.DestroyAPIView):
#     """
#     API view to cancel an appointment of the authenticated patient.
#     """
#     queryset = Appointment.objects.all()
#     serializer_class = AppointmentSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_object(self, pk):
#         patient = self.request.user.patientProfile
#         return get_object_or_404(Appointment, pk=pk, patient=patient)
