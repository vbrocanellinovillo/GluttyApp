
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import EstudioSangre, VariableEstudio, Celiac
from rest_framework.decorators import api_view, permission_classes
import json
from datetime import date
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal, InvalidOperation


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_study(request):
    if request.method == "POST":
        # Obtener los datos del cuerpo de la solicitud
        celiac_id = request.POST.get("celiac_id")
        fecha_estudio = request.POST.get("fecha_estudio")

        # Buscar al celiac para obtener su sexo y fecha de nacimiento
        try:
            celiac = Celiac.objects.get(id=celiac_id)
            sexo = celiac.sex
            date_birth = celiac.date_birth
            age = calculate_age(date_birth)
        except Celiac.DoesNotExist:
            return JsonResponse({"error": "Paciente celíaco no encontrado."}, status=404)

        # Función para convertir y manejar errores de conversión
        def safe_decimal(value):
            try:
                return Decimal(value)
            except (InvalidOperation, TypeError):
                return None

        # Recoger los valores ingresados para los estudios
        atTG_IgA = safe_decimal(request.POST.get("atTG_IgA"))
        aDGP_IgA = safe_decimal(request.POST.get("aDGP_IgA"))
        antiendomisio = safe_decimal(request.POST.get("antiendomisio"))
        hemoglobina = safe_decimal(request.POST.get("hemoglobina"))
        hematocrito = safe_decimal(request.POST.get("hematocrito"))
        ferritina = safe_decimal(request.POST.get("ferritina"))
        hierro_serico = safe_decimal(request.POST.get("hierro_serico"))
        vitamina_b12 = safe_decimal(request.POST.get("vitamina_b12"))
        calcio_serico = safe_decimal(request.POST.get("calcio_serico"))
        vitamina_d = safe_decimal(request.POST.get("vitamina_d"))
        alt = safe_decimal(request.POST.get("alt"))
        ast = safe_decimal(request.POST.get("ast"))
        colesterol_total = safe_decimal(request.POST.get("colesterol_total"))
        colesterol_hdl = safe_decimal(request.POST.get("colesterol_hdl"))
        trigliceridos = safe_decimal(request.POST.get("trigliceridos"))
        glucemia = safe_decimal(request.POST.get("glucemia"))

        # Asegurarse de que al menos un campo esté rellenado
        if not any([atTG_IgA, aDGP_IgA, antiendomisio, hemoglobina, hematocrito, ferritina, hierro_serico, vitamina_b12, calcio_serico, vitamina_d, alt, ast, colesterol_total, colesterol_hdl, trigliceridos, glucemia]):
            return JsonResponse({"error": "Debe ingresar al menos un valor de estudio."}, status=400)

        # Crear el objeto EstudioSangre
        estudio = EstudioSangre.objects.create(
            celiac_id=celiac_id,
            fecha_estudio=fecha_estudio,
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

        # Comparar valores con los normales
        results = {}
        results["IgA anti Transglutaminasa"] = verify_value("IgA anti Transglutaminasa", atTG_IgA, sexo, age)
        results["IgG anti Gliadina Deaminada"] = verify_value("IgG anti Gliadina Deaminada", aDGP_IgA, sexo, age)
        results["Hemoglobina"] = verify_value("Hemoglobina", hemoglobina, sexo, age)
        results["Hematocrito"] = verify_value("Hematocrito", hematocrito, sexo, age)
        results["Ferritina"] = verify_value("Ferritina", ferritina, sexo, age)
        results["Hierro Sérico"] = verify_value("Hierro Sérico", hierro_serico, sexo, age)
        results["Vitamina B12"] = verify_value("Vitamina B12", vitamina_b12, sexo, age)
        results["Calcio Sérico"] = verify_value("Calcio Sérico", calcio_serico, sexo, age)
        results["Vitamina D"] = verify_value("Vitamina D", vitamina_d, sexo, age)
        results["ALT"] = verify_value("ALT (alanina aminotransferasa)", alt, sexo, age)
        results["AST"] = verify_value("AST (aspartato aminotransferasa)", ast, sexo, age)
        results["Colesterol Total"] = verify_value("Colesterol Total", colesterol_total, sexo, age)
        results["Colesterol HDL"] = verify_value("Colesterol HDL", colesterol_hdl, sexo, age)
        results["Triglicéridos"] = verify_value("Triglicéridos", trigliceridos, sexo, age)
        results["Glucemia"] = verify_value("Glucemia", glucemia, sexo, age)

        return JsonResponse({"results": results, "mensaje": "Estudio registrado correctamente"}, status=201)


def calculate_age(date_birth):
    today = date.today()
    return today.year - date_birth.year - ((today.month, today.day) < (date_birth.month, date_birth.day))

def verify_value(variable_id, value, sexo, age):
    if value is not None:
        try:
            # Asegúrate de que value sea un número decimal
            value = Decimal(value)
        except (InvalidOperation, TypeError):
            return "Valor ingresado no es un número válido"

        # Buscar variable basada en ID
        variable = VariableEstudio.objects.filter(id=variable_id).first()
        if not variable:
            return "Variable no encontrada"

        # Normalizar sexo a mayúsculas para la comparación
        sexo = sexo.upper()

        # Filtrar por rango de edad si aplica
        if variable.depende_de_edad:
            try:
                if "años" in variable.depende_de_edad:
                    rango_age = variable.depende_de_edad.split(" ")
                    age_min = int(rango_age[0])
                    age_max = int(rango_age[2])
                    if not (age_min <= age <= age_max):
                        return f"No aplica para edad {age}"
            except (ValueError, IndexError):
                return "Error al procesar el rango de edad"

        # Verificar si el value ingresado está fuera del rango normal
        if value < variable.valor_minimo or value > variable.valor_maximo:
            return f"Fuera de rango (normal: {variable.valor_minimo} - {variable.valor_maximo})"
        
        return "Normal"
    return "No ingresado"