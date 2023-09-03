from datetime import datetime

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from apps.users.models import User
from apps.usersProfile.models import DoctorProfile, PatientProfile, SeminaristProfile, HealthInsurance   
from apps.appointments.models import PaymentMethod

MONTH_CHOICES = [
    (1, "Enero"),
    (2, "Febrero"),
    (3, "Marzo"),
    (4, "Abril"),
    (5, "Mayo"),
    (6, "Junio"),
    (7, "Julio"),
    (8, "Agosto"),
    (9, "Septiembre"),
    (10, "Octubre"),
    (11, "Noviembre"),
    (12, "Diciembre"),]

DAY_CHOICES = [
    (1, "Lunes"),
    (2, "Martes"),
    (3, "Miércoles"),
    (4, "Jueves"),
    (5, "Viernes"),
    (6, "Sabado"),
    (7, "Domingo"),]

STATE_CHOICES = [
    (1,"En Espera"),
    (2,"Confirmado"),
]
class BaseModel(models.Model):
    """
    Modelo base que proporciona campos de auditoría para creación y actualización.
    """
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        abstract = True

class Room(BaseModel):
    name     = models.CharField(max_length=100)
    capacity = models.IntegerField(validators=[MinValueValidator(1)])
    cost     = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)], default=0)
    is_active= models.BooleanField(default=True)
    def __str__(self):
        return f'nombre: {self.name}, Capacidad: {self.capacity}, Costo: {self.cost}'



class Seminar(BaseModel):
    name = models.CharField(max_length=100)
    month= models.IntegerField(choices=MONTH_CHOICES,db_index=True)
    year= models.IntegerField(db_index=True)
    weekday=models.IntegerField(choices=DAY_CHOICES)
    hour = models.TimeField()
    meetingNumber= models.IntegerField(validators=[MinValueValidator(1)])
    rooms= models.ManyToManyField(Room,through='SeminarRoomUsage')
    maxInscription= models.IntegerField(default=12,validators=[MinValueValidator(1)])
    price= models.DecimalField(max_digits=10, decimal_places=2,validators=[MinValueValidator(0)])
    is_active= models.BooleanField(default=True)
    seminarist=models.ManyToManyField(SeminaristProfile, related_name='seminaries')
    patients= models.ManyToManyField(PatientProfile, related_name='seminaries',through='SeminarInscription')

    def __str__(self):
        return f'nombre: {self.name}, Año: {self.year}, Mes:{self.month}, Hora: {self.hour} Precio Particular: {self.price}'

class SeminarRoomUsage(models.Model):
    seminar = models.ForeignKey(Seminar, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    encountersCount=models.IntegerField(default=1,validators=[MinValueValidator(1)])
    is_active=models.BooleanField(default=True)

    def __str__(self):
        return f'Seminario: {self.seminar.name}, Sala: {self.room.name}, Encuentros: {self.encountersCount}'

class Payment(models.Model):
    patient_copayment = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    hi_copayment = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True, validators=[MinValueValidator(0)])
    
class SeminarInscription(BaseModel):
    seminar= models.ForeignKey(Seminar, on_delete=models.CASCADE)
    patient= models.ForeignKey(PatientProfile, on_delete=models.CASCADE)
    meetingNumber= models.IntegerField(validators=[MinValueValidator(1)])
    state=models.IntegerField(choices=STATE_CHOICES,default=1)
    insurance= models.ForeignKey(HealthInsurance, on_delete=models.CASCADE)
    paymentMethod= models.ForeignKey(PaymentMethod,on_delete=models.CASCADE)
    

class Payment(models.Model):
    patient_copayment = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    hi_copayment = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True)
    