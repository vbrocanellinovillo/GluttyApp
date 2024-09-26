from django.forms import ValidationError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from requests import Response
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal, InvalidOperation
from datetime import date
from rest_framework import status
from rest_framework.response import Response
from usuarios.models import User
import re
import cloudinary.uploader
import cloudinary.api
import pdfplumber

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
    # Buscar celiaco para obtener sexo y edad
    try:
        user = request.user
        celiac = get_object_or_404(Celiac, user=user)
        sexo = celiac.sex  # "Male" o "Female"
        age = calculate_age(celiac.date_birth)
    except Celiac.DoesNotExist:
        return JsonResponse({"error": "Celiaco no encontrado"}, status=404)

    def safe_decimal(value):
        try:
            return Decimal(value)
        except (InvalidOperation, TypeError):
            return None

    print(request.data)
    # Recoger los valores ingresados para los estudios
    test_date = request.data.get("test_date")
    lab = request.data.get("lab")
    atTG_IgA = safe_decimal(request.data.get("atTG_IgA"))
    aDGP_IgA = safe_decimal(request.data.get("aDGP_IgA"))
    antiendomisio = request.data.get("antiendomisio")
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
        test_date=test_date,
        lab=lab,
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

    # Guardar si es que cargó un pdf del estudio
    files = request.FILES.getlist('pdf')

    for file in files:
        file_type = file.content_type
        if file_type not in ["image/jpeg", "image/png", "application/pdf"]:
            return JsonResponse({"error": "Formato de archivo no soportado. Solo se permiten imágenes y PDFs."}, status=400)
        
        upload_result = cloudinary.uploader.upload(file, resource_type='auto')
        url = upload_result['url']
        public_id = upload_result['public_id']
        
        estudio.url = url
        estudio.public_id = public_id
        estudio.save()
    
    return JsonResponse({"estudio_id": estudio.id, "message": "Estudio registrado exitosamente"})
    

# Función que devuelve los análisis encontrados
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_analysis(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    try:
        all_analysis_data = []
       #Se agregan todas las branches del comercio con el que se accede.
        celiac = Celiac.objects.filter(user=user).first()
        
        analysis = celiac.getAnalysis()

        for an in analysis:
            analysis_data = {
                "id": an.id,
                "date": an.getDate(),
                "lab": an.getLab(),
            }
        
        # Agregar el comercio completo a la lista de todos los comercios
            all_analysis_data.append(analysis_data)
            
        # Devolver los datos    
        return Response({"analysis": all_analysis_data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# Función principal que trae el análisis
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_analysis(request):
    # Obtener el ID del análisis del cuerpo de la solicitud
    analysis_id = request.data.get('id', None)
    
    if analysis_id is None:
        return Response({"error": "ID del análisis es requerido."}, status=status.HTTP_400_BAD_REQUEST)

    # Obtener el análisis usando el ID
    try:
        analysis = get_object_or_404(BloodTest, id=analysis_id)
    except BloodTest.DoesNotExist:
        return Response({"error": "Análisis no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    
    # Verificar que el análisis pertenezca al celíaco del usuario autenticado
    if analysis.celiac.user != request.user:
        return Response({"error": "No tienes permiso para acceder a este análisis."}, status=status.HTTP_403_FORBIDDEN)

    # Obtener información del celiaco (sexo, edad)
    celiac = analysis.celiac
    sex = celiac.sex if celiac.sex is not None else "N/A"  # Sexo puede ser null
    age = calculate_age(celiac.date_birth) if celiac.date_birth else None  # Si la fecha de nacimiento no existe

    # Laboratorio donde se realizó el análisis
    lab = analysis.lab

    # Obtener todas las variables asociadas al análisis
    variables = [
        {"name": "IgA anti Transglutaminasa", "value": analysis.atTG_IgA},
        {"name": "IgG anti Gliadina Deaminada", "value": analysis.aDGP_IgA},
        {"name": "Anticuerpos antiendomisio (EMA)", "value": analysis.antiendomisio},
        {"name": "Hemoglobina", "value": analysis.hemoglobina},
        {"name": "Hematocrito", "value": analysis.hematocrito},
        {"name": "Ferritina", "value": analysis.ferritina},
        {"name": "Hierro Sérico", "value": analysis.hierro_serico},
        {"name": "Vitamina B12", "value": analysis.vitamina_b12},
        {"name": "Calcio Sérico", "value": analysis.calcio_serico},
        {"name": "Vitamina D", "value": analysis.vitamina_d},
        {"name": "ALT (alanina aminotransferasa)", "value": analysis.alt},
        {"name": "AST (aspartato aminotransferasa)", "value": analysis.ast},
        {"name": "Colesterol Total", "value": analysis.colesterol_total},
        #{"name": "Colesterol LDL", "value": analysis.colesterol_ldl},
        {"name": "Colesterol HDL", "value": analysis.colesterol_hdl},
        {"name": "Triglicéridos", "value": analysis.trigliceridos},
        {"name": "Glucemia", "value": analysis.glucemia}
    ]
    
    # Contenedor para almacenar los resultados
    analysis_data = {
        "date": analysis.test_date,
        "lab": lab,
        "variables": []
    }

    # Procesar cada variable
    for variable in variables:
        if variable["value"] is not None:
            # Filtrar valores de referencia basados en sexo y edad, si aplican
            reference_values = ReferenceValues.objects.filter(
                variable__name=variable["name"],
                lab__name=lab,
                sex__in=[sex, "N/A"]  # Sexo puede ser el valor específico o "N/A"
            )
            
            if age is not None:
                # Si la edad está disponible, filtrar también por rango de edad
                reference_values = reference_values.filter(
                    models.Q(min_age__lte=age) | models.Q(min_age__isnull=True),
                    models.Q(max_age__gte=age) | models.Q(max_age__isnull=True)
                )

            if reference_values.exists():
                ref = reference_values.first()
                analysis_data["variables"].append({
                    "variable_name": variable["name"],
                    "value": variable["value"],
                    "min_value": ref.min_value,
                    "max_value": ref.max_value,
                    "description": ref.variable.getDescription()
                })
            else:
                analysis_data["variables"].append({
                    "variable_name": variable["name"],
                    "value": variable["value"],
                    "min_value": None,
                    "max_value": None,
                    "description": "Valores de referencia no disponibles"
                })
    
    return Response(analysis_data, status=200)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_analysis(request):
    analysis_id = request.data.get("analysis_id")
    if not analysis_id:
        return Response({"error": "El ID del análisis es requerido."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Encontrar la analysis que se quiere eliminar
        analysis = get_object_or_404(BloodTest, id=analysis_id)

        # Verificar si el usuario tiene permisos para actualizar la sucursal
        user = request.user
        if user.is_commerce or analysis.celiac.user != user:
            return Response({"error": "No está habilitado a realizar esta función"}, status=status.HTTP_403_FORBIDDEN)

        # Actualizar la sucursal con los datos proporcionados
        analysis.delete()
        return Response({"detail":"Se eliminó el análisis."}, status=status.HTTP_200_OK)
                        
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def extract_medical_data(request):
    pdf_file = request.FILES['file']
    
    # Definir patrones para las variables que queremos extraer
    patterns = {
        "IgA anti Transglutaminasa": [r"transglutaminasa.*?\s([\d,.]+)"],
        "IgG anti Gliadina Deaminada": [r"gliadina.*?\s([\d,.]+)"],
        "Anticuerpos antiendomisio (EMA)": [r"antiendomisio.*?\s([\d,.]+)"],
        "Hemoglobina": [r"hemoglobina.*?\s([\d,.]+)"],
        "Hematocrito": [r"hematocrito.*?\s([\d,.]+)"],
        "Ferritina": [r"ferritina.*?\s([\d,.]+)"],
        "Hierro sérico": [r"hierro sérico.*?\s([\d,.]+)", r"ferremia.*?\s([\d,.]+)"],
        "Vitamina B12": [r"vitamina b[-\s]?12.*?\s([\d,.]+)"],
        "Calcio sérico": [r"calcio.*?\s([\d,.]+)", r"calcemia.*?\s([\d,.]+)"],
        "Vitamina D": [r"vitamina d3?.*?\s([\d,.]+)", r"vitamina d total.*?\s([\d,.]+)"],
        "ALT": [r"alt.*?\s([\d,.]+)"],
        "AST": [r"ast.*?\s([\d,.]+)"],
        "Colesterol total": [r"colesterol total.*?\s([\d,.]+)", r"colesterolemia.*?\s([\d,.]+)", r"colesterol.*?\s([\d,.]+)"],
        "Colesterol LDL": [r"colesterol ldl.*?\s([\d,.]+)", r"ldl col.*?\s([\d,.]+)", r"colesterol l\.d\.l.*?\s([\d,.]+)"],
        "Colesterol HDL": [r"colesterol hdl.*?\s([\d,.]+)", r"hdl col.*?\s([\d,.]+)", r"colesterol h\.d\.l.*?\s([\d,.]+)"],
        "Triglicéridos": [r"triglicéridos.*?\s([\d,.]+)", r"trigliceridos.*?\s([\d,.]+)", r"trigliceridemia.*?\s([\d,.]+)"],
        "Glucemia": [r"glucemia.*?\s([\d,.]+)", r"glucosa.*?\s([\d,.]+)"]
    }
    
    results = {}
    
    # Abrir y procesar el archivo PDF
    with pdfplumber.open(pdf_file) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()

        # Para cada variable, extraer su valor usando los patrones definidos
        for variable, variable_patterns in patterns.items():
            results[variable] = extract_value(text, variable_patterns)
    
    return Response({"valores encontrados": results}, status=status.HTTP_200_OK)
    

# Función auxiliar para encontrar los valores con regex
def extract_value(text, patterns):
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(1)
    return None