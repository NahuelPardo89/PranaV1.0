# Generated by Django 4.2.1 on 2023-08-07 22:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usersProfile', '0005_doctorprofile_appoimentduration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctorprofile',
            name='appoimentDuration',
            field=models.DurationField(default=datetime.timedelta(seconds=3600)),
        ),
    ]
