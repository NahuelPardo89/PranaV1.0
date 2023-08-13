from django.db import models
from apps.usersProfile.models import DoctorProfile, PatientProfile, HealthInsurance, InsurancePlanDoctor


class PaymentMethod(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = 'Forma de Pago'
        verbose_name_plural = 'Formas de Pago'

    def __str__(self):
        return self.name


class Appointment(models.Model):
    """
    Model representing an appointment between a doctor and a patient.
    """

    class Meta:
        verbose_name = 'Turno'
        verbose_name_plural = 'Turnos'

    CHOICES_STATE = [("1", 'Pendiente'),
                     ("2", 'Confirmado'),
                     ("3", 'Adeuda'),
                     ("4", 'Pagado')]
    doctor = models.ForeignKey(
        DoctorProfile, on_delete=models.CASCADE)
    patient = models.ForeignKey(
        PatientProfile, on_delete=models.CASCADE)
    health_insurance = models.ForeignKey(
        HealthInsurance, on_delete=models.CASCADE, blank=True, null=True)
    day = models.DateField()
    hour = models.TimeField()
    # Temp until doctor's have a duration field
    duration = models.DurationField(blank=True, null=True)
    full_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    patient_copayment = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    hi_copayment = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    payment_method = models.ForeignKey(
        PaymentMethod, on_delete=models.SET_NULL, blank=True, null=True)
    state = models.CharField(max_length=1, choices=CHOICES_STATE)

    def find_common_hi(self):
        """
        Find the common insurances between a professional and a patient

        Returns:
            set: A set containing the common HealthInsurance objects.
        """
        return set(self.doctor.insurances.all()) & set(
            self.patient.insurances.all())

    def set_hi(self) -> int:
        """
        Set the lower cost health insurance for the appointment based on doctor and patient
        common insurances considering that at least they always have one: "Particular"

        Returns:
            int: The id of the selected HealthInsurance object.
        """

        # find the common insurances between the doctor and the patient
        common_insurance = self.find_common_hi()

        # initialize variables as "Particular" health insurance to find the full cost
        max_coverage_insurance = HealthInsurance.objects.filter(
            name='PARTICULAR').first()
        max_coverage_price = float('inf')

        # Set the full cost based on the particular cost of a professional
        self.full_cost = InsurancePlanDoctor.objects.get(
            doctor=self.doctor, insurance=max_coverage_insurance).price

        for insurance in common_insurance:
            insurance_plan = InsurancePlanDoctor.objects.get(
                doctor=self.doctor, insurance=insurance)
            if insurance_plan.price < max_coverage_price:
                max_coverage_price = insurance_plan.price
                max_coverage_insurance = insurance

        self.health_insurance = max_coverage_insurance
        return self.health_insurance.id

    def set_cost(self, update=False):
        """
        Set the patient copayment and health insurance copayment based on the health insurance.
        Calculate the copayment amounts based on the doctor's insurance price.

        Args:
            update (bool, optional): Whether to update the existing appointment or create a new one. 
                                     Defaults to False.
        """
        if not update:
            hi = self.set_hi()
            insurance = self.doctor.insurances.get(pk=hi)
        else:
            insurance = self.health_insurance

        insurance_plan = InsurancePlanDoctor.objects.get(
            doctor=self.doctor, insurance=insurance)
        self.patient_copayment = min(insurance_plan.price, self.full_cost)
        self.hi_copayment = max(self.full_cost - self.patient_copayment, 0)

    # def set_duration(self):
    #     self.duration = self.doctor.appointment_duration

    def __str__(self):
        """
        Method for string representation of an appointment

        Returns:
            str: A formatted string containing appointment information.
        """
        return f"""Turno del día: {self.day} , Horario: {self.hour} \n 
            Paciente: {self.patient.user.last_name}, {self.patient.user.name} \n 
            Profesional: {self.doctor.user.last_name}, {self.doctor.user.name} \n
            Obra Social: {self.health_insurance.name} \n
            Estado: {self.get_state_display()}\n
            Forma de Pago: {self.payment_method.name if self.payment_method else 'No especificada'}\n
            Costo Total: {self.full_cost}\n
            Copago del Paciente: {self.patient_copayment}\n
            Copago de la Obra Social: {self.hi_copayment}"""
