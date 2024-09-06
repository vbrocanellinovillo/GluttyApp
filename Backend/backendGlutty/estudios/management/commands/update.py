from django.core.management.base import BaseCommand
from estudios.models import BloodTestVariables

class Command(BaseCommand):
    help = 'Actualiza los valores de sexo en la tabla VariableEstudio'

    def handle(self, *args, **kwargs):
        # Actualizar "F" a "FEMALE"
        count_female_updated = BloodTestVariables.objects.filter(depends_on_sex="Female").update(depends_on_sex="FEMALE")
        # Actualizar "M" a "MALE"
        count_male_updated = BloodTestVariables.objects.filter(depends_on_sex="Male").update(depends_on_sex="MALE")

        # Mensajes de resultado
        self.stdout.write(self.style.SUCCESS(f'{count_female_updated} registros actualizados de "F" a "FEMALE"'))
        self.stdout.write(self.style.SUCCESS(f'{count_male_updated} registros actualizados de "M" a "MALE"'))
