# Generated by Django 4.2.1 on 2023-09-03 19:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('seminar', '0004_remove_seminarinscription_payment_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='seminarinscription',
            name='payment',
            field=models.OneToOneField(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='seminar.payment'),
        ),
    ]
