from django.contrib import admin
from .models import Room,SeminarRoomUsage, SeminarInscription,Seminar

admin.site.register(Seminar)
admin.site.register(Room)
admin.site.register(SeminarRoomUsage)
admin.site.register(SeminarInscription)
