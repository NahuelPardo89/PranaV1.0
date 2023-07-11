from django.db import models

from apps.users.models import User


class HealthInsurance(models.Model):
    name = models.CharField(max_length=255)
    
    class Meta:
        verbose_name = 'Obra Social'
        verbose_name_plural = 'Obras Sociales'
    
    def __str__(self):
        return self.name

class MedicalSpeciality(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Especialidad'
        verbose_name_plural = 'Especialidades'

    def __str__(self):
        return self.name


class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctorProfile')
    medicLicence= models.CharField('Matrícula', max_length=20,null=True, blank=True)
    specialty= models.ManyToManyField(MedicalSpeciality)
    insurances = models.ManyToManyField(HealthInsurance, through='InsurancePlanDoctor')
    is_active = models.BooleanField(default = True)

    class Meta:
        verbose_name = 'Profesional'
        verbose_name_plural = 'Profesionales'
    def __str__(self):
        return f'Profesional: {self.user.last_name.upper()}, {self.user.name}'

class DoctorSchedule(models.Model):
    DAY_CHOICES = [
        ('mon', 'Lunes'),
        ('tue', 'Martes'),
        ('wed', 'Miércoles'),
        ('thu', 'Jueves'),
        ('fri', 'Viernes'),
        ('sat', 'Sábado'),
        ('sun', 'Domingo'),
    ]
    day = models.CharField('Día', max_length=3, choices=DAY_CHOICES)
    start = models.TimeField('Hora de Inicio')
    end = models.TimeField('Hora de Fin')
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='schedules')

    class Meta:
        verbose_name = 'Horario'
        verbose_name_plural = 'Horarios'

    def __str__(self):
        return f'Horario de: {self.doctor.user.last_name.upper()}, {self.doctor.user.name}, Dia: {self.day}'
    

class InsurancePlanDoctor(models.Model):
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE)
    insurance = models.ForeignKey(HealthInsurance, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        unique_together = ('doctor', 'insurance')
    
    def __str__(self):
        return f'Profesional: {self.doctor.user.last_name.upper()}, {self.doctor.user.name}, Mutual: {self.insurance.name}, Costo: {self.price}'


class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patientProfile')
    facebook = models.CharField(max_length=80 ,blank=True, null=True)
    instagram = models.CharField(max_length=80,blank=True, null=True)
    address=models.CharField(max_length=200,blank=True, null=True)
    insurances = models.ManyToManyField(HealthInsurance, through='InsurancePlanPatient')
    is_active = models.BooleanField(default = True)

    class Meta:
        verbose_name = 'Paciente'
        verbose_name_plural = 'Pacientes'

    def __str__(self):
        return f'Paciente: {self.user.last_name}, {self.user.name}'


class InsurancePlanPatient(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE)
    insurance = models.ForeignKey(HealthInsurance, on_delete=models.CASCADE)
    code = models.CharField(max_length=100, blank=True, null=True)
    
    class Meta:
        unique_together = ('patient', 'insurance')
    
    def __str__(self):
        return f'Paciente: {self.patient.user.last_name.upper()}, {self.patient.user.name}, Mutual: {self.insurance.name}, N°: {self.code}'

