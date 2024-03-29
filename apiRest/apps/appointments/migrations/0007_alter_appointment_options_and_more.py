# Generated by Django 4.2.1 on 2023-07-27 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0006_paymentmethod_appointment_payment_method'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='appointment',
            options={'verbose_name': 'Turno', 'verbose_name_plural': 'Turnos'},
        ),
        migrations.AlterField(
            model_name='appointment',
            name='full_cost',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
    ]
