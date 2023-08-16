from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.appointments.models import Appointment
from apps.usersProfile.models import DoctorProfile
from apps.reports.api.serializers import CopaymentReportSerializer


class CopaymentReportView(APIView):
    """
    API view for generating copayment reports based on a date range, doctor, and specialty.
    """

    def post(self, request):
        """
        Generate a copayment report based on the provided parameters.

        Parameters:
        - start_date (Date): Start date of the report range.
        - end_date (Date): End date of the report range.
        - doctor (int, optional): ID of the doctor to filter by.
        - specialty (int, optional): ID of the medical specialty to filter by.

        Returns:
        - doctor (int): ID of the selected doctor.
        - speciality (int): ID of the selected specialty.
        - total_patient_copayment (Decimal): Total copayment paid by patients.
        - total_hi_copayment (Decimal): Total copayment paid by health insurance.
        """

        serializer = CopaymentReportSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):

            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']
            doctor = serializer.validated_data.get('doctor')
            specialty = serializer.validated_data.get('specialty')

            appointments = Appointment.objects.filter(
                day__range=[start_date, end_date])

            if doctor:
                doctor = DoctorProfile.objects.get(id=doctor)
                appointments = appointments.filter(doctor=doctor)

            # Unuseable until the speciality are added to appintments
            # if specialty:
            #     appointments = appointments.filter(
            #         doctor__doctorProfile__specialty=specialty)

            total_patient_copayment = sum(
                appointment.patient_copayment for appointment in appointments)
            total_hi_copayment = sum(
                appointment.hi_copayment for appointment in appointments)

            report_data = {
                'doctor': doctor.id,
                'specialty': specialty,
                'total_patient_copayment': total_patient_copayment,
                'total_hi_copayment': total_hi_copayment,
            }

            return Response(report_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
