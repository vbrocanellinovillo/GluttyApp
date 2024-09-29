from estudios.models import Laboratory, Variable
from django.db import connection

#Eliminar todas las variables existentes y restaurar los IDs
with connection.cursor() as cursor:
    cursor.execute("TRUNCATE TABLE estudios_variable RESTART IDENTITY CASCADE;")
print("Todos los registros de la tabla Variable han sido eliminados y los IDs han sido restaurados.")

# Cargar laboratorios
labs = ["LACE", "Hospital Privado", "Sanatorio Allende", "HUMANA"]

for lab in labs:
    lab_instance, created = Laboratory.objects.get_or_create(name=lab)
    if created:
        print(f"Laboratorio {lab} creado.")
    else:
        print(f"Laboratorio {lab} ya existe.")

# Cargar variables
variables_data = [
    {"name": "IgA Anti-Transglutaminasa", "description": "Anticuerpos utilizados para diagnosticar la enfermedad celíaca, ya que indican una respuesta inmunológica al gluten en personas con esta condición."},
    {"name": "IgG Anti-Gliadina Deaminada", "description": "Anticuerpos que ayudan a detectar intolerancia al gluten, especialmente en personas que no producen suficiente IgA."},
    {"name": "IgA Anti-Gliadina", "description": "Anticuerpos que responden a la gliadina, una proteína del gluten, usados en el diagnóstico de la enfermedad celíaca."},
    {"name": "Anticuerpos antiendomisio (EMA)", "description": "Anticuerpos específicos que se usan para confirmar la enfermedad celíaca, con alta precisión diagnóstica."},
    {"name": "Hemoglobina", "description": "Proteína en los glóbulos rojos que transporta oxígeno desde los pulmones al resto del cuerpo. Es esencial para mantener el cuerpo bien oxigenado."},
    {"name": "Hematocrito", "description": "Mide el porcentaje de glóbulos rojos en la sangre. Es una medida clave para entender la composición sanguínea."},
    {"name": "Ferritina", "description": "Proteína que almacena hierro en el cuerpo, proporcionando una reserva que puede utilizarse cuando el cuerpo lo necesita."},
    {"name": "Hierro Sérico", "description": "Cantidad de hierro presente en el suero sanguíneo, importante para la formación de glóbulos rojos y transporte de oxígeno."},
    {"name": "Vitamina B12", "description": "Vitamina esencial para la producción de glóbulos rojos y el buen funcionamiento del sistema nervioso."},
    {"name": "Calcio Sérico", "description": "Mineral esencial para mantener los huesos fuertes, además de regular la función muscular y nerviosa."},
    {"name": "Vitamina D", "description": "Vitamina crucial para la salud ósea, ya que facilita la absorción de calcio y ayuda en la función inmunitaria."},
    {"name": "ALT (alanina aminotransferasa)", "description": "Enzima presente en el hígado, que ayuda a descomponer proteínas. Se mide para evaluar la función hepática."},
    {"name": "AST (aspartato aminotransferasa)", "description": "Enzima presente en el hígado, el corazón y los músculos. Participa en el metabolismo de los aminoácidos."},
    {"name": "Colesterol Total", "description": "Suma del colesterol en la sangre, que incluye tanto el colesterol 'bueno' como el 'malo'."},
    {"name": "Colesterol LDL", "description": "Conocido como 'colesterol malo', se transporta a través de la sangre y puede depositarse en las arterias."},
    {"name": "Colesterol HDL", "description": "'Colesterol bueno' que ayuda a transportar el colesterol desde las arterias hacia el hígado para su eliminación."},
    {"name": "Triglicéridos", "description": "Tipo de grasa presente en la sangre, derivada principalmente de los alimentos que consumes."},
    {"name": "Glucemia", "description": "Nivel de glucosa en la sangre. La glucosa es la principal fuente de energía para las células del cuerpo."},
]

for var_data in variables_data:
    var_instance, created = Variable.objects.get_or_create(name=var_data["name"], defaults={"description": var_data["description"]})
    if created:
        print(f"Variable {var_data['name']} creada.")
    else:
        print(f"Variable {var_data['name']} ya existe.")
