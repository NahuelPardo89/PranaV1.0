# Generated by Django 4.2.1 on 2023-12-15 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usersProfile', '0011_healthinsurance_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicalspeciality',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
