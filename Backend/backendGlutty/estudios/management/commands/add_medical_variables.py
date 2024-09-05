from django.core.management.base import BaseCommand
from estudios.models import VariableEstudio

# Valores para las pruebas de celiaquía y otras pruebas complementarias
variables = [
    {"nombre": "IgA anti Transglutaminasa", "valor_minimo": 0, "valor_maximo": 10, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "IgG anti Gliadina Deaminada", "valor_minimo": 0, "valor_maximo": 15, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "Anticuerpos antiendomisio (EMA)", "valor_minimo": 0, "valor_maximo": 0, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "Hemoglobina", "valor_minimo": 12, "valor_maximo": 16, "depende_de_sexo": "F", "depende_de_edad": None},
    {"nombre": "Hemoglobina", "valor_minimo": 13, "valor_maximo": 18, "depende_de_sexo": "M", "depende_de_edad": None},
    {"nombre": "Hematocrito", "valor_minimo": 36, "valor_maximo": 46, "depende_de_sexo": "F", "depende_de_edad": None},
    {"nombre": "Hematocrito", "valor_minimo": 41, "valor_maximo": 53, "depende_de_sexo": "M", "depende_de_edad": None},
    {"nombre": "Ferritina", "valor_minimo": 20, "valor_maximo": 250, "depende_de_sexo": "M", "depende_de_edad": None},
    {"nombre": "Ferritina", "valor_minimo": 10, "valor_maximo": 120, "depende_de_sexo": "F", "depende_de_edad": None},
    {"nombre": "Hierro Sérico", "valor_minimo": 30, "valor_maximo": 160, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "Vitamina B12", "valor_minimo": 200, "valor_maximo": 900, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "Calcio Sérico", "valor_minimo": 8.6, "valor_maximo": 10.0, "depende_de_sexo": "N/A", "depende_de_edad": "18-60 años"},
    {"nombre": "Vitamina D", "valor_minimo": 30, "valor_maximo": 100, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "ALT (alanina aminotransferasa)", "valor_minimo": 5, "valor_maximo": 38, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "AST (aspartato aminotransferasa)", "valor_minimo": 5, "valor_maximo": 35, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "Colesterol Total", "valor_minimo": 0, "valor_maximo": 200, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "Colesterol LDL", "valor_minimo": 0, "valor_maximo": 120, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "Colesterol HDL", "valor_minimo": 40, "valor_maximo": 100, "depende_de_sexo": "M", "depende_de_edad": None},
    {"nombre": "Colesterol HDL", "valor_minimo": 50, "valor_maximo": 100, "depende_de_sexo": "F", "depende_de_edad": None},
    {"nombre": "Triglicéridos", "valor_minimo": 0, "valor_maximo": 150, "depende_de_sexo": "N/A", "depende_de_edad": None},
    {"nombre": "Glucemia", "valor_minimo": 70, "valor_maximo": 100, "depende_de_sexo": "N/A", "depende_de_edad": None}
]

class Command(BaseCommand):
    help = 'Inserta variables de estudio en la base de datos'

    def handle(self, *args, **kwargs):
        for variable in variables:
            VariableEstudio.objects.create(**variable)
        self.stdout.write(self.style.SUCCESS('Las variables se han insertado correctamente'))
