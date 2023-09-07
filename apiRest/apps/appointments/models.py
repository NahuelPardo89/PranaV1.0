from django.db import models
from apps.usersProfile.models import DoctorProfile, PatientProfile, HealthInsurance, InsurancePlanDoctor, MedicalSpeciality, SpecialityBranch


class PaymentMethod(models.Model):
    """
    Represents a payment method.

    Attributes:
        name (str): The name of the payment method.
    """
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = 'Forma de Pago'
        verbose_name_plural = 'Formas de Pago'

    def __str__(self):
        """
        Returns a string representation of the payment method.

        Returns:
            str: The string representation of the payment method.
        """
        return self.name


class Appointment(models.Model):
    """
    Model representing an appointment between a doctor and a patient.
    """

    class Meta:
        verbose_name = 'Turno'
        verbose_name_plural = 'Turnos'

    CHOICES_STATE = [(1, 'Pendiente'),
                     (2, 'Confirmado'),
                     (3, 'Adeuda'),
                     (4, 'Pagado')]
    doctor = models.ForeignKey(
        DoctorProfile, on_delete=models.PROTECT)
    specialty = models.ForeignKey(
        MedicalSpeciality, on_delete=models.SET_NULL, blank=True, null=True)
    branch = models.ForeignKey(
        SpecialityBranch, on_delete=models.SET_NULL, null=True, blank=True)
    patient = models.ForeignKey(
        PatientProfile, on_delete=models.PROTECT)
    health_insurance = models.ForeignKey(
        HealthInsurance, on_delete=models.SET_NULL, blank=True, null=True)
    day = models.DateField()
    hour = models.TimeField()
    duration = models.DurationField(blank=True, null=True)
    full_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    patient_copayment = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    hi_copayment = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    payment_method = models.ForeignKey(
        PaymentMethod, on_delete=models.SET_NULL, blank=True, null=True)
    state = models.IntegerField(choices=CHOICES_STATE, default=1)

    def find_common_hi(self):
        """
        Find the common insurances between a professional and a patient

        Returns:
            set: A set containing the common HealthInsurance objects.
        """
        return set(self.doctor.insurances.all()) & set(
            self.patient.insurances.all())

    def set_branch(self):
        """
        Set the branch of the appointment.

        If the branch is not already assigned, it will be set to the default branch ('GENERAL').

        This method is used to ensure that an appointment is associated with a branch.

        Returns:
            None
        """
        if not self.branch:
            # static branch assignment
            self.branch = SpecialityBranch.objects.get(
                name='GENERAL')

    def set_full_cost(self):
        """
        Set the full cost of the appointment.

        If the full cost is not already assigned, it will be calculated based on the particular cost of a professional.

        This method is used to ensure that an appointment has a valid full cost.

        Returns:
            None
        """
        # initialize variables as "Particular" health insurance to find the full cost
        base_hi = HealthInsurance.objects.filter(
            name='PARTICULAR').first()

        # Static cost assignment
        if not self.full_cost:
            # Set the full cost based on the particular cost of a professional (checked in serializer)
            self.full_cost = InsurancePlanDoctor.objects.get(
                doctor=self.doctor, insurance=base_hi, branch=self.branch).price

    def set_hi(self):
        """
        Set the health insurance for the appointment based on doctor and patient common insurances.

        This method searches for common insurances between the doctor and the patient and selects the one with the
        lowest cost. If the doctor and patient do not have any common insurances, the appointment's health insurance
        will be set to "Particular."

        Returns:
            int: The ID of the selected HealthInsurance object.
        """

        if not self.health_insurance:
            # find the common insurances between the doctor and the patient
            common_insurance = self.find_common_hi()

            # Aux variables
            max_coverage_insurance = None
            max_coverage_price = float('inf')

            for insurance in common_insurance:
                # Check if the professional works with the branch for that specific shared hi
                insurance_plan = InsurancePlanDoctor.objects.filter(
                    doctor=self.doctor, insurance=insurance, branch=self.branch).first()
                if insurance_plan:
                    if insurance_plan.price < max_coverage_price:
                        max_coverage_price = insurance_plan.price
                        max_coverage_insurance = insurance

            self.health_insurance = max_coverage_insurance

    def set_specialty(self):
        """
        Set the specialty of the appointment based on the doctor's specialty.

        Returns:
            None
        """
        self.specialty = self.doctor.specialty.first()

    def set_cost(self):
        """
        Set the patient copayment and health insurance copayment based on the health insurance.

        Calculate the copayment amounts based on the doctor's insurance price and the appointment's full cost.
        """
        insurance_plan = InsurancePlanDoctor.objects.get(
            doctor=self.doctor, insurance=self.health_insurance, branch=self.branch)
        self.patient_copayment = min(
            insurance_plan.price, self.full_cost)
        self.hi_copayment = max(
            self.full_cost - self.patient_copayment, 0)

    def set_fields(self):
        """
        This method initializes specialty, branch, full cost, health insurance, and cost-related fields
        for the appointment based on the doctor, patient, and other appointment details.
        """
        self.set_specialty()
        self.set_branch()
        self.set_full_cost()
        self.set_hi()
        self.set_cost()

    def __str__(self):
        """
        Method for string representation of an appointment

        Returns:
            str: A formatted string containing appointment information.
        """
        return f"""Turno del día: {self.day} , Horario: {self.hour} \n 
            Paciente: {self.patient.user.last_name}, {self.patient.user.name} \n 
            Profesional: {self.doctor.user.last_name}, {self.doctor.user.name} \n
            """
