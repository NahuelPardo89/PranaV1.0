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
            send_mail(
                'Recordatorio de turno',
                'Tienes un turno agendado para mañana.',
                [app.patient.user.email],
                fail_silently=False,
            )


# crontab.add(SendReminders, '0 12 * * *')
