from django.core.management.base import BaseCommand
from estudios.models import BloodTestVariables

# Valores para las pruebas de celiaquía y otras pruebas complementarias con descripción añadida
variables = [
    {"name": "IgA anti Transglutaminasa", "min_value": 0, "max_value": 10, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Anticuerpos dirigidos contra la transglutaminasa tisular, utilizados para diagnosticar la enfermedad celíaca."},
    {"name": "IgG anti Gliadina Deaminada", "min_value": 0, "max_value": 15, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Anticuerpos utilizados para detectar intolerancia al gluten, principalmente en individuos con deficiencia de IgA."},
    {"name": "Anticuerpos antiendomisio (EMA)", "min_value": 0, "max_value": 0, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Anticuerpos específicos para diagnosticar enfermedad celíaca, con alta especificidad."},
    {"name": "Hemoglobina", "min_value": 12, "max_value": 16, "depends_on_sex": "Female", "depends_on_age": None, "description": "Proteína en los glóbulos rojos que transporta oxígeno; los valores varían según el sexo."},
    {"name": "Hemoglobina", "min_value": 13, "max_value": 18, "depends_on_sex": "Male", "depends_on_age": None, "description": "Proteína en los glóbulos rojos que transporta oxígeno; los valores varían según el sexo."},
    {"name": "Hematocrito", "min_value": 36, "max_value": 46, "depends_on_sex": "Female", "depends_on_age": None, "description": "Porcentaje de glóbulos rojos en la sangre; los valores varían según el sexo."},
    {"name": "Hematocrito", "min_value": 41, "max_value": 53, "depends_on_sex": "Male", "depends_on_age": None, "description": "Porcentaje de glóbulos rojos en la sangre; los valores varían según el sexo."},
    {"name": "Ferritina", "min_value": 20, "max_value": 250, "depends_on_sex": "Male", "depends_on_age": None, "description": "Proteína que almacena hierro en el cuerpo; los valores son diferentes según el sexo."},
    {"name": "Ferritina", "min_value": 10, "max_value": 120, "depends_on_sex": "Female", "depends_on_age": None, "description": "Proteína que almacena hierro en el cuerpo; los valores son diferentes según el sexo."},
    {"name": "Hierro Sérico", "min_value": 30, "max_value": 160, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Cantidad de hierro en el suero sanguíneo, utilizado para diagnosticar deficiencia de hierro o sobrecarga de hierro."},
    {"name": "Vitamina B12", "min_value": 200, "max_value": 900, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Vitamina esencial para la función nerviosa y la producción de glóbulos rojos."},
    {"name": "Calcio Sérico", "min_value": 8.6, "max_value": 10.0, "depends_on_sex": "N/A", "depends_on_age": "18-60 años", "description": "Mineral esencial para la salud ósea; los niveles varían con la edad."},
    {"name": "Vitamina D", "min_value": 30, "max_value": 100, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Vitamina esencial para la salud ósea y la función inmune."},
    {"name": "ALT (alanina aminotransferasa)", "min_value": 5, "max_value": 38, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Enzima hepática utilizada para evaluar la función del hígado."},
    {"name": "AST (aspartato aminotransferasa)", "min_value": 5, "max_value": 35, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Enzima hepática utilizada en la evaluación de daños hepáticos."},
    {"name": "Colesterol Total", "min_value": 0, "max_value": 200, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Medida de los niveles totales de colesterol en sangre, factor de riesgo cardiovascular."},
    {"name": "Colesterol LDL", "min_value": 0, "max_value": 120, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Colesterol de baja densidad, conocido como 'colesterol malo'."},
    {"name": "Colesterol HDL", "min_value": 40, "max_value": 100, "depends_on_sex": "Male", "depends_on_age": None, "description": "Colesterol de alta densidad, conocido como 'colesterol bueno'."},
    {"name": "Colesterol HDL", "min_value": 50, "max_value": 100, "depends_on_sex": "Female", "depends_on_age": None, "description": "Colesterol de alta densidad, conocido como 'colesterol bueno'."},
    {"name": "Triglicéridos", "min_value": 0, "max_value": 150, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Grasas presentes en la sangre, asociadas con el riesgo cardiovascular."},
    {"name": "Glucemia", "min_value": 70, "max_value": 100, "depends_on_sex": "N/A", "depends_on_age": None, "description": "Niveles de glucosa en sangre en ayunas, indicador clave en el diagnóstico de diabetes."}
]

class Command(BaseCommand):
    help = 'Inserta variables de estudio en la base de datos'

    def handle(self, *args, **kwargs):
        for variable in variables:
            BloodTestVariables.objects.create(**variable)
        self.stdout.write(self.style.SUCCESS('Las variables se han insertado correctamente'))
