from django.contrib import admin
from .models import Seminar, Room, Meeting

admin.site.register(Seminar)
admin.site.register(Room)
admin.site.register(Meeting)