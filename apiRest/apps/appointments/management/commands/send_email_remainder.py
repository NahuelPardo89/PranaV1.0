from django.core.management.base import BaseCommand
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from datetime import datetime, timedelta
from apps.appointments.models import Appointment
from django.core.mail import send_mail
class Command(BaseCommand):
    help = 'Send reminder emails to patients with appointments the next day'

    def handle(self, *args, **kwargs):
        # Calcular la fecha de mañana
        send_mail(
            'Restablecimiento de Contraseña-NO RESPONDER',
            f'Esta es tu nueva contraseña: ',
            'no-reply@tudominio.com',
            ['nahuel.pardo74@gmail.com'],
            fail_silently=False,
        )

        self.stdout.write(self.style.SUCCESS('Successfully sent reminder emails'))