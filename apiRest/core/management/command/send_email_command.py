from django.core.management.base import BaseCommand
from django.core.mail import send_mail

class Command(BaseCommand):
    help = 'Send scheduled emails'

    def handle(self, *args, **kwargs):
        send_mail(
            'Subject here',
            'Here is the message.',
            'from@example.com',
            ['nahuel.pardo74@gmail.com'],
            fail_silently=False,
        )
        self.stdout.write(self.style.SUCCESS('Successfully sent email'))