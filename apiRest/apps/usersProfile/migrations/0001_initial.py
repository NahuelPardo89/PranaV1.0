# Generated by Django 4.2.1 on 2023-07-01 20:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DoctorProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medicLicence', models.CharField(blank=True, max_length=20, null=True, verbose_name='Matrícula')),
            ],
            options={
                'verbose_name': 'Profesional',
                'verbose_name_plural': 'Profesionales',
            },
        ),
        migrations.CreateModel(
            name='HealthInsurance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'Obra Social',
                'verbose_name_plural': 'Obras Sociales',
            },
        ),
        migrations.CreateModel(
            name='InsurancePlanPatient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=100, null=True)),
                ('insurance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usersProfile.healthinsurance')),
            ],
        ),
        migrations.CreateModel(
            name='MedicalSpeciality',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Especialidad',
                'verbose_name_plural': 'Especialidades',
            },
        ),
        migrations.CreateModel(
            name='PatientProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('facebook', models.CharField(blank=True, max_length=80, null=True)),
                ('instagram', models.CharField(blank=True, max_length=80, null=True)),
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('insurances', models.ManyToManyField(through='usersProfile.InsurancePlanPatient', to='usersProfile.healthinsurance')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Paciente',
                'verbose_name_plural': 'Pacientes',
            },
        ),
        migrations.AddField(
            model_name='insuranceplanpatient',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usersProfile.patientprofile'),
        ),
        migrations.CreateModel(
            name='InsurancePlanDoctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usersProfile.doctorprofile')),
                ('insurance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usersProfile.healthinsurance')),
            ],
            options={
                'unique_together': {('doctor', 'insurance')},
            },
        ),
        migrations.CreateModel(
            name='DoctorSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.CharField(choices=[('mon', 'Lunes'), ('tue', 'Martes'), ('wed', 'Miércoles'), ('thu', 'Jueves'), ('fri', 'Viernes'), ('sat', 'Sábado'), ('sun', 'Domingo')], max_length=3, verbose_name='Día')),
                ('start', models.TimeField(verbose_name='Hora de Inicio')),
                ('end', models.TimeField(verbose_name='Hora de Fin')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedules', to='usersProfile.doctorprofile')),
            ],
            options={
                'verbose_name': 'Horario',
                'verbose_name_plural': 'Horarios',
            },
        ),
        migrations.AddField(
            model_name='doctorprofile',
            name='insurances',
            field=models.ManyToManyField(through='usersProfile.InsurancePlanDoctor', to='usersProfile.healthinsurance'),
        ),
        migrations.AddField(
            model_name='doctorprofile',
            name='specialty',
            field=models.ManyToManyField(to='usersProfile.medicalspeciality'),
        ),
        migrations.AddField(
            model_name='doctorprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='insuranceplanpatient',
            unique_together={('patient', 'insurance')},
        ),
    ]
