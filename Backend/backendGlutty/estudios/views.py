from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import BloodTest, BloodTestVariables, Celiac
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal, InvalidOperation
from datetime import date
import re

def calculate_age(birth_date):
    today = date.today()
    return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

def verify_value(variable_name, value, sex, age):
    try:
        # Filtrar la variable por nombre y considerar el sexo y rango de edad si corresponde
        variables = BloodTestVariables.objects.filter(name=variable_name).filter(
            # Buscar variables que coincidan con el sexo o sean "N/A" para sexo
            depends_on_sex__in=[sex, "N/A"]
        )

        # Si no hay variables disponibles, retornar no encontrada
        if not variables.exists():
            return {"estado": "Variable no encontrada", "valor": value}

        # Si hay variables, debemos verificar si alguna depende de la edad
        if age is not None:
            variables_con_edad = variables.filter(depends_on_age__isnull=False)

            # Si la variable depende de la edad, verificar el rango de edad
            if variables_con_edad.exists():
                for variable in variables_con_edad:
                    age_range = variable.depends_on_age.split('-')
                    min_age = int(re.sub(r'\D', '', age_range[0]))  # Solo dejar dígitos
                    max_age = int(re.sub(r'\D', '', age_range[1]))
                    if min_age <= age <= max_age:
                        break
                else:
                    return {"estado": "Fuera de rango de edad", "valor": value, "descripcion": "No apto para edad"}

        # Evaluar el valor con respecto a los valores mínimos y máximos
        variable = variables.first()
        if value < variable.min_value:
            return {"estado": "Por debajo de lo normal", "valor": value, "descripcion": variable.description}
        elif value > variable.max_value:
            return {"estado": "Por encima de lo normal", "valor": value, "descripcion": variable.description}
        else:
            return {"estado": "Normal", "valor": value, "descripcion": variable.description}
    
    except BloodTestVariables.DoesNotExist:
        return {"estado": "Variable no encontrada", "valor": value}



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_study(request):
    if request.method == "POST":
        celiac_id = request.data.get("celiac_id")
        fecha_estudio = request.data.get("fecha_estudio")

        # Buscar celiaco para obtener sexo y edad
        try:
            celiac = Celiac.objects.get(id=celiac_id)
            sexo = celiac.sex  # "Male" o "Female"
            age = calculate_age(celiac.date_birth)
        except Celiac.DoesNotExist:
            return JsonResponse({"error": "Celiaco no encontrado"}, status=404)

        def safe_decimal(value):
            try:
                return Decimal(value)
            except (InvalidOperation, TypeError):
                return None

        # Recoger los valores ingresados para los estudios
        atTG_IgA = safe_decimal(request.data.get("atTG_IgA"))
        aDGP_IgA = safe_decimal(request.data.get("aDGP_IgA"))
        antiendomisio = safe_decimal(request.data.get("antiendomisio"))
        hemoglobina = safe_decimal(request.data.get("hemoglobina"))
        hematocrito = safe_decimal(request.data.get("hematocrito"))
        ferritina = safe_decimal(request.data.get("ferritina"))
        hierro_serico = safe_decimal(request.data.get("hierro_serico"))
        vitamina_b12 = safe_decimal(request.data.get("vitamina_b12"))
        calcio_serico = safe_decimal(request.data.get("calcio_serico"))
        vitamina_d = safe_decimal(request.data.get("vitamina_d"))
        alt = safe_decimal(request.data.get("alt"))
        ast = safe_decimal(request.data.get("ast"))
        colesterol_total = safe_decimal(request.data.get("colesterol_total"))
        colesterol_hdl = safe_decimal(request.data.get("colesterol_hdl"))
        trigliceridos = safe_decimal(request.data.get("trigliceridos"))
        glucemia = safe_decimal(request.data.get("glucemia"))

        # Crear objeto EstudioSangre
        estudio = BloodTest.objects.create(
            celiac=celiac,
            test_date=fecha_estudio,
            atTG_IgA=atTG_IgA,
            aDGP_IgA=aDGP_IgA,
            antiendomisio=antiendomisio,
            hemoglobina=hemoglobina,
            hematocrito=hematocrito,
            ferritina=ferritina,
            hierro_serico=hierro_serico,
            vitamina_b12=vitamina_b12,
            calcio_serico=calcio_serico,
            vitamina_d=vitamina_d,
            alt=alt,
            ast=ast,
            colesterol_total=colesterol_total,
            colesterol_hdl=colesterol_hdl,
            trigliceridos=trigliceridos,
            glucemia=glucemia
        )

        # Comparar valores con los normales y agregar descripciones
        results = {}
        if atTG_IgA is not None:
            results["IgA anti Transglutaminasa"] = verify_value("IgA anti Transglutaminasa", atTG_IgA, sexo, age)
        if aDGP_IgA is not None:
            results["IgG anti Gliadina Deaminada"] = verify_value("IgG anti Gliadina Deaminada", aDGP_IgA, sexo, age)
        if antiendomisio is not None:
            results["Anticuerpos antiendomisio (EMA)"] = verify_value("Anticuerpos antiendomisio (EMA)", antiendomisio, sexo, age)
        if hemoglobina is not None:
            results["Hemoglobina"] = verify_value("Hemoglobina", hemoglobina, sexo, age)
        if hematocrito is not None:
            results["Hematocrito"] = verify_value("Hematocrito", hematocrito, sexo, age)
        if ferritina is not None:
            results["Ferritina"] = verify_value("Ferritina", ferritina, sexo, age)
        if hierro_serico is not None:
            results["Hierro Sérico"] = verify_value("Hierro Sérico", hierro_serico, sexo, age)
        if vitamina_b12 is not None:
            results["Vitamina B12"] = verify_value("Vitamina B12", vitamina_b12, sexo, age)
        if calcio_serico is not None:
            results["Calcio Sérico"] = verify_value("Calcio Sérico", calcio_serico, sexo, age)
        if vitamina_d is not None:
            results["Vitamina D"] = verify_value("Vitamina D", vitamina_d, sexo, age)
        if alt is not None:
            results["ALT"] = verify_value("ALT (alanina aminotransferasa)", alt, sexo, age)
        if ast is not None:
            results["AST"] = verify_value("AST (aspartato aminotransferasa)", ast, sexo, age)
        if colesterol_total is not None:
            results["Colesterol Total"] = verify_value("Colesterol Total", colesterol_total, sexo, age)
        if colesterol_hdl is not None:
            results["Colesterol HDL"] = verify_value("Colesterol HDL", colesterol_hdl, sexo, age)
        if trigliceridos is not None:
            results["Triglicéridos"] = verify_value("Triglicéridos", trigliceridos, sexo, age)
        if glucemia is not None:
            results["Glucemia"] = verify_value("Glucemia", glucemia, sexo, age)

        return JsonResponse({"estudio_id": estudio.id, "resultados": results})
