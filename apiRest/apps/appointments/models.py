from django.db import models
from apps.usersProfile.models import DoctorProfile, PatientProfile, HealthInsurance, InsurancePlanDoctor


class Appointment(models.Model):
    """
    Model representing an appointment between a doctor and a patient.
    """
    CHOICES_STATE = [("1", 'Pendiente'), ("2", 'Confirmado'),
                     ("3", 'Cancelado'), ("4", 'Pagado'), ("5", 'Adeuda')]
    doctor = models.ForeignKey(
        DoctorProfile, on_delete=models.CASCADE)
    patient = models.ForeignKey(
        PatientProfile, on_delete=models.CASCADE)
    health_insurance = models.ForeignKey(
        HealthInsurance, on_delete=models.CASCADE, blank=True, null=True)
    day = models.DateField()
    hour = models.TimeField()
    # Temp until doctor's have a duration field
    duration = models.TimeField(blank=True, null=True)
    full_cost = models.DecimalField(max_digits=10, decimal_places=2)
    patient_copayment = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    hi_copayment = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    state = models.CharField(max_length=1, choices=CHOICES_STATE)

    def set_hi(self) -> int:
        """
        Set the health insurance for the appointment based on doctor and patient insurance.
        If both have a common insurance, set it as the health insurance for the appointment.
        Otherwise, set it to 1, indicating no insurance.

        Returns:
            the id of the health insurance
        """

        # find the common insurances between the doctor and the patient
        common_insurance = set(self.doctor.insurances.all()) & set(
            self.patient.insurances.all())

        # initialize variables as "Particular" health insurance to find the full cost
        max_coverage_insurance = HealthInsurance.objects.filter(
            name='PARTICULAR').first()
        max_coverage_price = float('inf')

        # Set the full cost based on the cost of a particular appointment (Cambiar a set cost)
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

    def set_cost(self):
        """
        Set the patient copayment and health insurance copayment based on the health insurance.
        If health insurance is 1 (no insurance), set patient copayment to full cost and health insurance
        copayment to 0. Otherwise, calculate the copayments based on the doctor's insurance price.
        """
        hi = self.set_hi()
        insurance = self.doctor.insurances.get(pk=hi)

        if insurance:
            insurance_plan = InsurancePlanDoctor.objects.get(
                doctor=self.doctor, insurance=insurance)
            self.hi_copayment = insurance_plan.price
            self.patient_copayment = self.full_cost - self.hi_copayment
        else:
            self.hi_copayment = 0
            self.patient_copayment = self.full_cost
