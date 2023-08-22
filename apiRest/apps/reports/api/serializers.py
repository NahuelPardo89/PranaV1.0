from rest_framework import serializers
from apps.appointments.models import Appointment
from apps.usersProfile.models import DoctorProfile, MedicalSpeciality


class CopaymentReportSerializer(serializers.Serializer):
    """
    Serializer for generating copayment reports based on date range, doctor, and specialty.
    """
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    doctor = serializers.IntegerField(required=False)
    specialty = serializers.IntegerField(required=False)

    def validate(self, data):
        """
        Validate the input data for generating the copayment report.

        Args:
            data (dict): The input data.

        Returns:
            dict: The validated data.

        Raises:
            serializers.ValidationError: If the validation fails.
        """
        start_date = data['start_date']
        end_date = data['end_date']
        doctor = data.get('doctor')
        specialty = data.get('specialty')

        # Checks if the date range is correct
        if start_date > end_date:
            raise serializers.ValidationError(
                "La fecha de inicio del reporte debe ser posterior a la fecha de fin")

        appointments = Appointment.objects.filter(
            day__range=[start_date, end_date])

        # Checks if the doctor exists
        if doctor:
            try:
                doctor = DoctorProfile.objects.get(id=doctor)
                appointments = appointments.filter(doctor=doctor)
            except DoctorProfile.DoesNotExist:
                raise serializers.ValidationError("Profesional no encontrado")

        if specialty:
            try:
                specialty = MedicalSpeciality.objects.get(id=specialty)
                appointments = appointments.filter(specialty=specialty)
            except MedicalSpeciality.DoesNotExist:
                raise serializers.ValidationError("Especialidad no encontrada")

        appointments = appointments.filter(state="4")

        # Checks if the doctor register appointments with the specific speciality
        if doctor and specialty and not appointments.exists():
            raise serializers.ValidationError(
                "El profesional no registra turnos en estado 'Pagado' con la especialidad asignada")

        return data
