from django.core.management.base import BaseCommand
from estudios.models import VariableEstudio

class Command(BaseCommand):
    help = 'Actualiza los valores de sexo en la tabla VariableEstudio'

    def handle(self, *args, **kwargs):
        # Actualizar "F" a "FEMALE"
        count_female_updated = VariableEstudio.objects.filter(depende_de_sexo="F").update(depende_de_sexo="FEMALE")
        # Actualizar "M" a "MALE"
        count_male_updated = VariableEstudio.objects.filter(depende_de_sexo="M").update(depende_de_sexo="MALE")

        # Mensajes de resultado
        self.stdout.write(self.style.SUCCESS(f'{count_female_updated} registros actualizados de "F" a "FEMALE"'))
        self.stdout.write(self.style.SUCCESS(f'{count_male_updated} registros actualizados de "M" a "MALE"'))
