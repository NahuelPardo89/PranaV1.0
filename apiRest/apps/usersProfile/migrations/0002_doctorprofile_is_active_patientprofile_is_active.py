# Generated by Django 4.2.1 on 2023-07-02 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usersProfile', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctorprofile',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='patientprofile',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]