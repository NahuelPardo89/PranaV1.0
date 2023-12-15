from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.db.models import Sum
from apps.appointments.models import Appointment
from apps.reports.api.serializers import CopaymentReportSerializer
from apps.appointments.api.serializers import AppointmentSerializerList


def perform_report(serializer, request):
    """
    Generates a report based on the data provided by the serializer.

    Args:
    - serializer: The serializer containing the data to generate the report.
    - request: The request object.

    Returns:
    - report_data: A dictionary containing a summary of patient and appointment
      information, as well as appointment details.

    This function performs filtered queries on the Appointments database based on
    the data provided by the serializer. It then calculates various aspects of
    the report, such as the number of patients, number of appointments,
    and sums of copayments for patients and health insurances.
    """
    start_date = serializer.validated_data['start_date']
    end_date = serializer.validated_data['end_date']
    doctor = serializer.validated_data.get('doctor')
    specialty = serializer.validated_data.get('specialty')
    branch = serializer.validated_data.get('branch')
    payment_method = serializer.validated_data.get('payment_method')
    health_insurance = serializer.validated_data.get('health_insurance')
    patient = serializer.validated_data.get('patient')

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
    if health_insurance:
        appointments = appointments.filter(
            health_insurance=health_insurance)
    if patient:
        appointments = appointments.filter(
            patient=patient)

    # Calculate the summary data - Cant Patients
    num_patients = appointments.values('patient').distinct().count()
    # Cant Doctors
    num_doctors = appointments.values('doctor').distinct().count()
    # HI
    num_particular_insurances = appointments.filter(
        health_insurance__name__iexact='particular').values('health_insurance').count()
    num_other_insurances = appointments.exclude(
        health_insurance__name__iexact='particular').values('health_insurance').distinct().count()
    # Appointments
    num_appointments = appointments.count()
    appointments_serializer = AppointmentSerializerList(
        appointments, many=True)

    report_data = {
        'summary': {
            'num_appointments': num_appointments,
            'num_patients': num_patients,
            'num_doctors': num_doctors,
            'num_particular_insurances': num_particular_insurances,
            'num_other_insurances': num_other_insurances,
            'total_patient_copayment': appointments.aggregate(Sum('patient_copayment'))['patient_copayment__sum'],
            'total_hi_copayment': appointments.aggregate(Sum('hi_copayment'))['hi_copayment__sum'],
            'doctor': doctor,
            'specialty': specialty,
            'branch': branch,
            'payment_method': payment_method,
            'health_insurance': health_insurance,
            'patient': patient,
        },
        'appointments': appointments_serializer.data,
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
        API view for generating copayment reports based on a date range.
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
