# Generated by Django 4.2.1 on 2024-10-07 02:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usersProfile', '0015_merge_20240521_1511'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctorprofile',
            name='copayment',
        ),
    ]
