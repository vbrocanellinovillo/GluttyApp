from django.core.management.base import BaseCommand
from django.utils import timezone
from django.core.mail import send_mail
from usuarios.models import Celiac
from django.conf import settings

class Command(BaseCommand):
    help = 'Send email reminders for next analysis'

    def handle(self, *args, **kwargs):
        tomorrow = timezone.now().date() + timezone.timedelta(days=1)
        celiacs = Celiac.objects.filter(next_analysis_date=tomorrow)

        message = f"""
            ¡Hola {celiac.first_name}!

            Este es un recordatorio de que mañana ({celiac.next_analysis_date}) es tu análisis programado.
            ¡No lo olvides!
            
            Saludos,
            Equipo Glutty.
            """

        for celiac in celiacs:
            send_mail(
                "¡Recordatorio de análisis!",
                message,
                settings.DEFAULT_FROM_EMAIL,
                [celiac.user.email],
                fail_silently=False,
            )
            
        self.stdout.write("Recordatorios enviados con éxito.")
