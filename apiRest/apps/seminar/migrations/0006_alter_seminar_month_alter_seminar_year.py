# Generated by Django 4.2.1 on 2023-09-03 19:43

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seminar', '0005_seminarinscription_payment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seminar',
            name='month',
            field=models.CharField(choices=[('Enero', 'Enero'), ('Febrero', 'Febrero'), ('Marzo', 'Marzo'), ('Abril', 'Abril'), ('Mayo', 'Mayo'), ('Junio', 'Junio'), ('Julio', 'Julio'), ('Agosto', 'Agosto'), ('Septiembre', 'Septiembre'), ('Octubre', 'Octubre'), ('Noviembre', 'Noviembre'), ('Diciembre', 'Diciembre')], db_index=True, max_length=12),
        ),
        migrations.AlterField(
            model_name='seminar',
            name='year',
            field=models.IntegerField(db_index=True, validators=[django.core.validators.MinValueValidator(2023), django.core.validators.MaxValueValidator(2060)]),
        ),
    ]
