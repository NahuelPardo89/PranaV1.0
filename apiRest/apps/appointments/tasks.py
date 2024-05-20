from django.core.mail import send_mail
from django_cron import CronJobBase, Schedule


class SendReminders(CronJobBase):
    RUN_DAILY = True

    schedule = Schedule(run_every_mins=1440)  # Ejecuta diariamente
    code = 'my_app.send_reminders'  # Un código único

    def do(self):
        try:
            print("Running cron job")
            send_mail(
                'Recordatorio de turno',
                'Este es un correo de prueba.',
                ['alvaroarmendariz11@gmail.com', 'nahuel.pardo74@gmail.com'],
                fail_silently=False,
            )
        except Exception as e:
            print("Error: ", e)


# import datetime
# import django_crontab
# from django.core.mail import send_mail
# #from django_cronjobs import CronJobBase
# # from django_crontab.cronjobs import CronJobBase
# # from django_crontab import CronJobBase
# from .models import Appointment


# class SendReminders(CronJobBase):
#     RUN_DAILY = True

#     def do(self):
#         # tomorrow = datetime.date.today() + datetime.timedelta(days=1)
#         # appointments = Appointment.objects.filter(day=tomorrow)
#         try:
#             print("Running cron job")
#             send_mail(
#                 'Recordatorio de turno',
#                 'Este es un correo de prueba.',
#                 ['alvaroarmendariz11@gmail.com', 'nahuel.pardo74@gmail.com'],
#                 fail_silently=False,
#             )

#             # for app in appointments:
#             #     print("Running cron job")
#             #     send_mail(
#             #         'Recordatorio de turno',
#             #         'Este es un correo de prueba.',
#             #         ['alvaroarmendariz11@gmail.com', 'nahuel.pardo74@gmail.com'],
#             #         fail_silently=False,
#             #     )
#             # send_mail(
#             #     'Recordatorio de turno',
#             #     'Tienes un turno agendado para mañana.',
#             #     [app.patient.user.email],
#             #     fail_silently=False,
#             # )
#         except Exception as e:
#             print("Error: ", e)
