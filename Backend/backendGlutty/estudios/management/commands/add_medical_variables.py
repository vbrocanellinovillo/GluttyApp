from django.core.management.base import BaseCommand
from estudios.models import VariableEstudio

# Valores para las pruebas de celiaquía y otras pruebas complementarias
variables = [
    {"name": "IgA anti Transglutaminasa", "min_value": 0, "max_value": 10, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "IgG anti Gliadina Deaminada", "min_value": 0, "max_value": 15, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "Anticuerpos antiendomisio (EMA)", "min_value": 0, "max_value": 0, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "Hemoglobina", "min_value": 12, "max_value": 16, "depends_on_sex": "F", "depends_on_age": None},
    {"name": "Hemoglobina", "min_value": 13, "max_value": 18, "depends_on_sex": "M", "depends_on_age": None},
    {"name": "Hematocrito", "min_value": 36, "max_value": 46, "depends_on_sex": "F", "depends_on_age": None},
    {"name": "Hematocrito", "min_value": 41, "max_value": 53, "depends_on_sex": "M", "depends_on_age": None},
    {"name": "Ferritina", "min_value": 20, "max_value": 250, "depends_on_sex": "M", "depends_on_age": None},
    {"name": "Ferritina", "min_value": 10, "max_value": 120, "depends_on_sex": "F", "depends_on_age": None},
    {"name": "Hierro Sérico", "min_value": 30, "max_value": 160, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "Vitamina B12", "min_value": 200, "max_value": 900, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "Calcio Sérico", "min_value": 8.6, "max_value": 10.0, "depends_on_sex": "N/A", "depends_on_age": "18-60 años"},
    {"name": "Vitamina D", "min_value": 30, "max_value": 100, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "ALT (alanina aminotransferasa)", "min_value": 5, "max_value": 38, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "AST (aspartato aminotransferasa)", "min_value": 5, "max_value": 35, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "Colesterol Total", "min_value": 0, "max_value": 200, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "Colesterol LDL", "min_value": 0, "max_value": 120, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "Colesterol HDL", "min_value": 40, "max_value": 100, "depends_on_sex": "M", "depends_on_age": None},
    {"name": "Colesterol HDL", "min_value": 50, "max_value": 100, "depends_on_sex": "F", "depends_on_age": None},
    {"name": "Triglicéridos", "min_value": 0, "max_value": 150, "depends_on_sex": "N/A", "depends_on_age": None},
    {"name": "Glucemia", "min_value": 70, "max_value": 100, "depends_on_sex": "N/A", "depends_on_age": None}
]

class Command(BaseCommand):
    help = 'Inserta variables de estudio en la base de datos'

    def handle(self, *args, **kwargs):
        for variable in variables:
            VariableEstudio.objects.create(**variable)
        self.stdout.write(self.style.SUCCESS('Las variables se han insertado correctamente'))
