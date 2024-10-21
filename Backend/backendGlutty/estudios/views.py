from django.forms import ValidationError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from requests import Response
from sqlalchemy import DateTime
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
from .serializers import *
from django.db.models import Q
from datetime import timedelta
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from django.db import connection


def calculate_age(birth_date, test_date = date.today()):
    # Calcula la edad en la fecha del estudio
    return test_date.year - birth_date.year - ((test_date.month, test_date.day) < (birth_date.month, birth_date.day))

def safe_decimal(value):
        try:
            return Decimal(value)
        except (InvalidOperation, TypeError):
            return None

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_analysis(request):
    # Buscar celiaco para obtener sexo y edad
    try:
        user = request.user
        celiac = get_object_or_404(Celiac, user=user)
        
        #Recoger los valores ingresados para los estudios
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

        #Cambiar los valores a None si se pasa undefined
        atTG_IgA = None if atTG_IgA == 'undefined' or atTG_IgA == 'null' else atTG_IgA
        aDGP_IgG = None if aDGP_IgG == 'undefined' or aDGP_IgG == 'null'else aDGP_IgG
        aDGP_IgA = None if aDGP_IgA == 'undefined' or aDGP_IgA == 'null'else aDGP_IgA
        antiendomisio = None if antiendomisio == 'undefined' or antiendomisio == 'null' else antiendomisio

        #Crear objeto EstudioSangre
        analysis = BloodTest.objects.create(
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
        
        # Guardar si es que cargó un pdf del analysis
        file = request.FILES.get('pdf')
        if file:
            analysis.uploadPdf(file)

        connection.close()
        return JsonResponse({"analysis_id": analysis.id, "message": "Estudio registrado exitosamente"})
        
    except Celiac.DoesNotExist:
        connection.close()
        return JsonResponse({"error": "Celiaco no encontrado"}, status=404)


# Función que permite modificar un análisis de sangre
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_analysis(request):
    analysis_id = request.data.get("analysis_id")
    
    if not analysis_id:
        return Response({"error": "El ID del análisis es requerido."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        analysis = get_object_or_404(BloodTest, id=analysis_id)

        # Verificar si el usuario tiene permisos para actualizar la sucursal
        user = request.user
        celiac = get_object_or_404(Celiac, user=user)
        
        if user.is_commerce or analysis.celiac != celiac:
            return Response({"error": "No está habilitado a realizar esta función"}, status=status.HTTP_403_FORBIDDEN)
        
        # Actualizar la información
        analysis_serializer = BloodTestSerializer(analysis, data=request.data, partial=True)
        if analysis_serializer.is_valid():
            analysis_serializer.save()
        else:
            connection.close()
            return Response({"error": analysis_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        # Guardar si es que cargó un pdf del estudio
        file = request.FILES.get('pdf')
        if file:
            if analysis.uploadPdf(file):
                print('pdf uploaded')
        elif file == None:
            if analysis.deletePdf():
                print('pdf erased')
        
        connection.close()
        return Response({"detail": "Análisis actualizado correctamente."}, status=status.HTTP_200_OK)
    except ValidationError as e:
        connection.close()
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        connection.close()
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  


# Función que devuelve los análisis encontrados
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_analysis(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    if not user:
        connection.close()
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
        connection.close() 
        return Response({"analysis": all_analysis_data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        connection.close()
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
def get_non_null_variables(user):    
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=404)
    
    celiac = Celiac.objects.filter(user=user).first()
    
    if not celiac:
        return Response({"error": "No se encontró el celiaco asociado al usuario."}, status=404)
    
    # Obtener todos los estudios de sangre relacionados con el celiaco
    blood_tests = BloodTest.objects.filter(celiac=celiac)

    non_null_variables = set()  # Usamos un set para evitar duplicados
    
    # Iterar sobre todos los estudios del celiaco
    for test in blood_tests:
        # Iterar sobre el mapeo de variables y comprobar si alguna no es nula
        for friendly_name, field_name in VARIABLE_MAP.items():
            if getattr(test, field_name) is not None:  # Si la variable no es nula
                non_null_variables.add(friendly_name)
    
    if non_null_variables:
        return list(non_null_variables)
    
    
# Función principal que trae el análisis
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_analysis(request):
    # Obtener el ID del análisis del cuerpo de la solicitud
    analysis_id = request.data.get('id', None)
    
    if analysis_id is None:
        connection.close()
        return Response({"error": "ID del análisis es requerido."}, status=status.HTTP_400_BAD_REQUEST)

    # Obtener el análisis usando el ID
    try:
        analysis = get_object_or_404(BloodTest, id=analysis_id)
    except BloodTest.DoesNotExist:
        connection.close()
        return Response({"error": "Análisis no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    
    # Verificar que el análisis pertenezca al celíaco del usuario autenticado
    if analysis.celiac.user != request.user:
        return Response({"error": "No tienes permiso para acceder a este análisis."}, status=status.HTTP_403_FORBIDDEN)

    # Obtener información del celiaco (sexo, edad)
    celiac = analysis.celiac
    analysis_data = get_reference_values(celiac, analysis)
    
    connection.close()
    return Response(analysis_data, status=200)

# Función para eliminar estudio y eliminar pdf del 
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_analysis(request):
    analysis_id = request.data.get("analysis_id")
    if not analysis_id:
        connection.close()
        return Response({"error": "El ID del análisis es requerido."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Encontrar la analysis que se quiere eliminar
        analysis = get_object_or_404(BloodTest, id=analysis_id)

        # Verificar si el usuario tiene permisos para actualizar la sucursal
        user = request.user
        if user.is_commerce or analysis.celiac.user != user:
            connection.close()
            return Response({"error": "No está habilitado a realizar esta función"}, status=status.HTTP_403_FORBIDDEN)

        # Actualizar la sucursal con los datos proporcionados
        if analysis.public_id and (analysis.url.startswith("http://res.cloudinary.com/") or analysis.url.startswith("https://res.cloudinary.com/")):
            pdf_delete_result = cloudinary.api.delete_resources(analysis.public_id, resource_type="image", type="upload")
            print(pdf_delete_result)
        analysis.delete()
        connection.close()
        return Response({"detail":"Se eliminó el análisis."}, status=status.HTTP_200_OK)
                        
    except ValidationError as e:
        connection.close()
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        connection.close()
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
            
    connection.close()
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
        
        initial_data["variables"] = get_non_null_variables(user)
        
        latest_analysis = celiac.getLatestAnalysis()
    
        non_null_variables = None
        
        # Validación por si no tiene estudios cargados
        if latest_analysis:
            non_null_variables = latest_analysis.get_random_non_null_variable()
        
        initial_data["statistics"] = non_null_variables
        
        next_analysis_date = celiac.getNextAnalysisDate()
        reminder = get_years_months_days(next_analysis_date)
        
        initial_data["next-analysis-date"] = next_analysis_date
        
        initial_data["analysis-reminder"] = {
            "years": reminder[0],
            "months": reminder[1],
            "days": reminder[2]
        }
        
        # Devolver los datos    
        connection.close()
        return Response(initial_data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# Función que calcula la cantidad de años, meses y días desde el día actual hasta la fecha de su próximo estudio
def get_years_months_days(future_date):
    # Obtener la fecha actual
    today = date.today()

    # Si la fecha es null, devolver None None None
    if not future_date:
        return [None, None, None]

    # Asegurarse de que la fecha futura sea mayor que la actual
    if future_date <= today:
        return "Error: La fecha debe ser posterior a la fecha actual."

    # Calcular la diferencia usando relativedelta
    delta = relativedelta(future_date, today)

    # Obtener los años, meses y días
    years = delta.years
    months = delta.months
    days = delta.days

    return [years, months, days]

# Función que cancela el mensaje principal de que glutty no es médico
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_medical_message(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    celiac = Celiac.objects.filter(user=user).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    # Verificar que el análisis pertenezca al celíaco del usuario autenticado
    if celiac.user != request.user:
        connection.close()
        return Response({"error": "No tienes permiso para acceder a esta funcionalidad."}, status=status.HTTP_403_FORBIDDEN)
    try:
        celiac.show_message = False
        celiac.save()
            
        # Devolver los datos
        connection.close()
        return Response({"Detail": f"No se mostrará el mensaje nuevamente."}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Función que devuelve los laboratorios cargados
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_laboratories(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    try:
        laboratories_data = []
       
        laboratories = Laboratory.objects.all()
        
        for lab in laboratories:
            lab_info = {
                "id": str(lab.id),
                "name": lab.name,
            }
        
            laboratories_data.append(lab_info)
        
        # Devolver los datos
        connection.close()
        return Response(laboratories_data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# Función que trae los valores de referencia correspondientes a un estudio
def get_reference_values(celiac, analysis):
    age = calculate_age(celiac.date_birth, analysis.test_date) if celiac.date_birth else None  # Si la fecha de nacimiento no existe

    # Laboratorio donde se realizó el análisis
    lab = analysis.lab

    # Obtener todas las variables asociadas al análisis
    variables = [
        {"name": "IgA Anti-Transglutaminasa", "value": analysis.atTG_IgA},
        {"name": "IgG Anti-Gliadina Deaminada", "value": analysis.aDGP_IgG},
        {"name": "IgA Anti-Gliadina", "value": analysis.aDGP_IgA},
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
        {"name": "Colesterol LDL", "value": analysis.colesterol_ldl},
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
            # Filtrar valores de referencia basados en sexo y edad, si aplica   
            reference_values = ReferenceValues.objects.filter(
                variable__name=variable["name"],
                lab__name=lab).filter(Q(sex__isnull=True) | Q(sex=celiac.sex))
            
            print(f"Variable name: {variable['name']}")
            print(f"Lab name: {lab}")

            print(str(reference_values))
            
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
                    "description": ref.variable.getDescription(),
                    "unit_of_measurement": ref.variable.getUnitOfMeasurement()
                })
            else:
                
                # Filtrar en memoria por el nombre
                filtered_variable = Variable.objects.get(name=variable["name"])
                print(str(filtered_variable))
                analysis_data["variables"].append({
                    "variable_name": variable["name"],
                    "value": variable["value"],
                    "min_value": None,
                    "max_value": None,
                    "description": filtered_variable.getDescription(),
                    "unit_of_measurement": filtered_variable.getUnitOfMeasurement()
                })
                
    return analysis_data

# Función que genera las estadísticas
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_statistics(request):
    variable_name = request.data.get('variable_name', None)
    period = request.data.get('period', None)

    if variable_name is None:
        return Response({"error": "El nombre de la variable es requerido."}, status=status.HTTP_400_BAD_REQUEST)

    # Mapeo de nombres de variables
    VARIABLE_MAP = {
        "IgA Anti-Transglutaminasa": "atTG_IgA",
        "IgG Anti-Gliadina Deaminada": "aDGP_IgA",
        "IgA Anti-Gliadina": "aDGP_IgG",
        "Anticuerpos antiendomisio (EMA)": "antiendomisio",
        "Hemoglobina": "hemoglobina",
        "Hematocrito": "hematocrito",
        "Ferritina": "ferritina",
        "Hierro Sérico": "hierro_serico",
        "Vitamina B12": "vitamina_b12",
        "Calcio Sérico": "calcio_serico",
        "Vitamina D": "vitamina_d",
        "ALT (alanina aminotransferasa)": "alt",
        "AST (aspartato aminotransferasa)": "ast",
        "Colesterol Total": "colesterol_total",
        "Colesterol HDL": "colesterol_hdl",
        "Colesterol LDL": "colesterol_ldl",
        "Triglicéridos": "trigliceridos",
        "Glucemia": "glucemia",
    }

    # Obtener el nombre del campo del modelo correspondiente
    variable_field_name = VARIABLE_MAP.get(variable_name)

    if not variable_field_name:
        return Response({"error": "Nombre de variable no válido."}, status=status.HTTP_400_BAD_REQUEST)

    celiac = request.user.celiac

    today = timezone.now().date()
    start_date = None
    if period == '3 meses':
        start_date = today - timedelta(days=90)
    elif period == '6 meses':
        start_date = today - timedelta(days=180)
    elif period == '1 año':
        start_date = today - timedelta(days=365)
    elif period == '3 años':
        start_date = today - timedelta(days=1095)

    analyses = BloodTest.objects.filter(celiac=celiac, test_date__gte=start_date) if start_date else BloodTest.objects.filter(celiac=celiac)

    variable_data = []
    for analysis in analyses:
        value = getattr(analysis, variable_field_name, None)  # Usar el nombre de campo correcto
        if value is not None:
            reference_values = ReferenceValues.objects.filter(
                variable__name=variable_name,
                lab__name=analysis.lab
            ).filter(Q(sex__isnull=True) | Q(sex=celiac.sex))

            age = calculate_age(celiac.date_birth, analysis.test_date) if celiac.date_birth else None
            
            if age is not None:
                reference_values = reference_values.filter(
                    Q(min_age__lte=age) | Q(min_age__isnull=True),
                    Q(max_age__gte=age) | Q(max_age__isnull=True)
                )
            else:
                reference_values = reference_values.filter(Q(min_age__isnull=True) & Q(max_age__isnull=True))

            if not reference_values.exists():
                reference_values = ReferenceValues.objects.filter(
                    variable__name=variable_name,
                    lab__name=analysis.lab,
                    sex__isnull=True,
                    min_age__isnull=True,
                    max_age__isnull=True
                )

            min_value = None
            max_value = None
            
            if reference_values.exists():
                ref = reference_values.first()
                min_value = ref.min_value
                max_value = ref.max_value
            
            variable_data.append({
                "date": analysis.test_date,
                "value": value,
                "min_value": min_value,
                "max_value": max_value,
                "lab": analysis.lab
            })

    connection.close()
    return Response(variable_data, status=200)

# Función que trae glutty tips
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_glutty_tips(request):
    # Obtener todos los GluttyTips
    all_tips = list(GluttyTips.objects.all())
    
    # Seleccionar 4 tips aleatorios
    if len(all_tips) < 4:
        selected_tips = random.sample(all_tips, len(all_tips))  # Si hay menos de 4, selecciona todos
    else:
        selected_tips = random.sample(all_tips, 4)

    # Serializar los tips seleccionados
    serializer = GluttyTipsSerializer(selected_tips, many=True)
    
    # Crear la respuesta
    response_data = {
        "glutty_tips": serializer.data
    }
    
    connection.close()
    return Response(response_data, status=200)

# Función que guarda la fecha del próximo análisis
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_analysis_date(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    celiac = Celiac.objects.filter(user=user).first()
    
    # Verificar que el celíaco que está guardando la fecha sea el mismo del usuario
    if celiac.user != request.user:
        connection.close()
        return Response({"error": "No tienes permiso para acceder a esta funcionalidad."}, status=status.HTTP_403_FORBIDDEN)
    try:
        analysis_date = request.data.get("date", None)
        if analysis_date == None:
            return Response({"error": "Una fecha es requerida."}, status=status.HTTP_400_BAD_REQUEST)
            
        celiac.next_analysis_date = analysis_date
        celiac.save()
            
        # Devolver los datos
        connection.close()
        return Response({"Detail": f"Se guardó la fecha '{analysis_date}' correctamente."}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Función que cancela la fecha del próximo análisis
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cancel_analysis_date(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    celiac = Celiac.objects.filter(user=user).first()
    
    # Verificar que el celíaco que está guardando la fecha sea el mismo del usuario
    if celiac.user != request.user:
        connection.close()
        return Response({"error": "No tienes permiso para acceder a esta funcionalidad."}, status=status.HTTP_403_FORBIDDEN)
    try:
        celiac.CancelAnalysisDate()
            
        # Devolver los datos
        connection.close()
        return Response({"Detail": f"Se canceló la fecha del análisis."}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)