# Generated by Django 4.2.1 on 2023-12-16 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usersProfile', '0012_medicalspeciality_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='specialitybranch',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]