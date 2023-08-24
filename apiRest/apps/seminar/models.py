from django.db import models

from apps.usersProfile.models import DoctorProfile, PatientProfile, SeminaristProfile   

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


class Room(models.Model):
    name    = models.CharField(max_length=100)
    capacity= models.IntegerField()
    cost    = models.DecimalField(max_digits=10, decimal_places=2, null=True)

class Seminar(models.Model):
    name = models.CharField(max_length=100)
    month= models.IntegerField(choices=MONTH_CHOICES)
    year= models.IntegerField()
    meetingNumber= models.IntegerField()
    price= models.DecimalField(max_digits=10, decimal_places=2)
    is_active= models.BooleanField(default=True)
    seminarist=models.ManyToManyField(SeminaristProfile, related_name='seminaries')


class Meeting(models.Model):
    seminar= models.ForeignKey(Seminar,on_delete=models.CASCADE,  related_name='meeting')
    room= models.ForeignKey(Room,on_delete=models.CASCADE)
    date= models.DateField(auto_now_add=True)
    patients= models.ManyToManyField(PatientProfile, related_name='meeting')
    