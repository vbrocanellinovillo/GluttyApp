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
import random
from .serializers import GluttyTipsSerializer

from django.db.models import Q

def calculate_age(birth_date):
    today = date.today()
    return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

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
    atTG_IgA = request.data.get("atTG_IgA")
    aDGP_IgG = request.data.get("aDGP_IgG")
    aDGP_IgA = request.data.get("aDGP_IgA")
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
    colesterol_ldl = safe_decimal(request.data.get("colesterol_ldl"))
    trigliceridos = safe_decimal(request.data.get("trigliceridos"))
    glucemia = safe_decimal(request.data.get("glucemia"))

    # Crear objeto EstudioSangre
    estudio = BloodTest.objects.create(
        celiac=celiac,
        test_date=test_date,
        lab=lab,
        atTG_IgA=atTG_IgA,
        aDGP_IgG=aDGP_IgG,
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
        colesterol_ldl=colesterol_ldl,
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
    analysis_data = get_reference_values(celiac, analysis)
    
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
        "IgA anti Transglutaminasa": [r"transglutaminasa.*?(positivo|negativo|[\d,.]+)"],
        "IgG anti Gliadina Deaminada": [r"igg.*?gliadin[ae]s?.*?\b(positivo|negativo|[\d,.]+)\b"],
        "IgA anti Gliadina": [r"iga.*?gliadin[ae]s?.*?\b(positivo|negativo|[\d,.]+)\b"],
        "Anticuerpos antiendomisio (EMA)": [r"anti[-\s]?endomisio.*?(positivo|negativo)", r"ema.*?(positivo|negativo)"],
        "Hemoglobina": [r"hemoglobina.*?\s([\d,.]+)"],
        "Hematocrito": [r"hematocrito.*?\s([\d,.]+)"],
        "Ferritina": [r"ferritina.*?\s([\d,.]+)"],
        "Hierro sérico": [r"hierro sérico.*?\s([\d,.]+)", r"ferremia.*?\s([\d,.]+)"],
        "Vitamina B12": [r"vitamina b[-\s]?12.*?\s([\d,.]+)"],
        "Calcio sérico": [r"calcio.*?\s([\d,.]+)", r"calcemia.*?\s([\d,.]+)"],
        "Vitamina D": [r"vitamina d3?.*?\s([\d,.]+)", r"vitamina d total.*?\s([\d,.]+)"],
        "ALT": [r"alt.*?\s([\d,.]+)\s?U/L"],
        "AST": [r"ast.*?\s([\d,.]+)\s?U/L"],
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
            return match.group(1).upper()
    return None

# Función que devuelve los datos para inicializar la sección de ESTUDIOS MÉDICOS
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_initial_data(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    try:
        initial_data = {}
       
        celiac = Celiac.objects.filter(user=user).first()
        
        analysis = celiac.getAnalysis()
        analysis_count = analysis.count()
        
        show_message = celiac.getShowMessage()
        
        initial_data["message"] = show_message
        
        initial_data["analysis"] = analysis_count
        
        latest_analysis = celiac.getLatestAnalysis()
        
        # Esto es lo que hay que cambiar
        initial_data["statistics"] = str(latest_analysis)
        
        # Devolver los datos    
        return Response(initial_data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)