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
        print("hola")
        for celiac in celiacs:
            formatted_date = celiac.next_analysis_date.strftime('%d-%m-%Y')
            send_mail(
                "¡Recordatorio de análisis!",
                        f"""
                ¡Hola {celiac.first_name}!

                Este es un recordatorio de que mañana {formatted_date} es tu análisis programado.
                ¡No lo olvides!
                
                Saludos,
                Equipo Glutty.
                """,
                settings.DEFAULT_FROM_EMAIL,
                [celiac.user.email],
                fail_silently=False,
            )
            print(celiac.user.email)
            print("hola")
            
        self.stdout.write("Recordatorios enviados con éxito.")
