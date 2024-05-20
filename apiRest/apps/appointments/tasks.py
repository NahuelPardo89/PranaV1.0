import datetime
from django.core.mail import send_mail
from django_crontab import CronJobBase
from .models import Appointment


class SendReminders(CronJobBase):
    RUN_DAILY = True

    def do(self):
        tomorrow = datetime.date.today() + datetime.timedelta(days=1)
        appointments = Appointment.objects.filter(day=tomorrow)

        for app in appointments:
            print("Running cron job")
            send_mail(
                'Recordatorio de turno',
                'Este es un correo de prueba.',
                'tu_correo@example.com',
                ['alvaroarmendariz11@gmail.com', 'nahuel.pardo74@gmail.com'],
                fail_silently=False,
            )
            # send_mail(
            #     'Recordatorio de turno',
            #     'Tienes un turno agendado para mañana.',
            #     [app.patient.user.email],
            #     fail_silently=False,
            # )
