# Generated by Django 4.2.1 on 2023-07-08 19:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('usersProfile', '0002_doctorprofile_is_active_patientprofile_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctorprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='doctorProfile', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='patientprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='patientProfile', to=settings.AUTH_USER_MODEL),
        ),
    ]