from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.db.models import Sum
from apps.appointments.models import Appointment
from apps.reports.api.serializers import CopaymentReportSerializer


def perform_report(serializer, request):
    start_date = serializer.validated_data['start_date']
    end_date = serializer.validated_data['end_date']
    doctor = serializer.validated_data.get('doctor')
    specialty = serializer.validated_data.get('specialty')
    branch = serializer.validated_data.get('branch')
    payment_method = serializer.validated_data.get('payment_method')

    appointments = Appointment.objects.filter(
        day__range=[start_date, end_date], state=4)

    if doctor:
        appointments = appointments.filter(doctor=doctor)
    if specialty:
        appointments = appointments.filter(specialty=specialty)
    if branch:
        appointments = appointments.filter(branch=branch)
    if payment_method:
        appointments = appointments.filter(
            payment_method=payment_method)

    # Calculate the number of patients and number of appointments
    num_patients = appointments.values('patient').distinct().count()
    num_appointments = appointments.count()

    report_data = {
        'doctor': doctor,
        'specialty': specialty,
        'branch': branch,
        'payment_method': payment_method,
        'num_patients': num_patients,
        'num_appointments': num_appointments,
        'total_patient_copayment': appointments.aggregate(Sum('patient_copayment'))['patient_copayment__sum'],
        'total_hi_copayment': appointments.aggregate(Sum('hi_copayment'))['hi_copayment__sum'],
    }

    return report_data


class AdminAppointmentReportView(APIView):
    """
    API view for generating copayment reports based on a date range, doctor, and specialty.
    """
    serializer_class = CopaymentReportSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """

        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            report_data = perform_report(serializer, request)
            return Response(report_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorAppointmentReportView(APIView):
    """
    API view for generating copayment reports based on a date range, doctor, and specialty.
    """
    serializer_class = CopaymentReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """

        """
        request.data['doctor'] = request.user.doctorProfile.id
        request.data['specialty'] = request.user.doctorProfile.specialty.first().id
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            report_data = perform_report(
                serializer, request)
            return Response(report_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
