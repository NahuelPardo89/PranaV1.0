from django.contrib import admin
from .models import DoctorProfile,PatientProfile, HealthInsurance, MedicalSpeciality,DoctorSchedule,InsurancePlanPatient,InsurancePlanDoctor
admin.site.register(DoctorProfile)
admin.site.register(PatientProfile)
admin.site.register(HealthInsurance)
admin.site.register(MedicalSpeciality)
admin.site.register(DoctorSchedule)
admin.site.register(InsurancePlanDoctor)
admin.site.register(InsurancePlanPatient)
