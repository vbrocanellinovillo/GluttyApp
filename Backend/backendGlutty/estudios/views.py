from django.forms import ValidationError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from requests import Response
from .models import BloodTest, BloodTestVariables, Celiac
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

    # Recoger los valores ingresados para los estudios
    test_date = request.data.get("test_date")
    lab = request.data.get("lab")
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

    # Subir y guardar cada menú
    for file in files:
        file_type = file.content_type

        if file_type not in ["image/jpeg", "image/png", "application/pdf"]:
            return Response({"error": "Formato de archivo no soportado. Solo se permiten imágenes y PDFs."}, status=status.HTTP_400_BAD_REQUEST)

        upload_result = cloudinary.uploader.upload(
            file,
            resource_type='auto'
        )
        
        url=upload_result['url']
        public_id=upload_result['public_id']
        
        estudio.url = url
        estudio.public_id = public_id
        estudio.save()
        
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
    

# Función que devuelve los análisis encontrados
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_analysis(request):
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
def extract_values_from_pdf(request):
    # Verificar si el archivo PDF fue enviado en la solicitud
    pdf_file = request.FILES.get('file')

    if not pdf_file:
        return Response({"error": "No se ha enviado ningún archivo PDF."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Abrir el archivo PDF utilizando pdfplumber
        with pdfplumber.open(pdf_file) as pdf:
            text = ''
            for page in pdf.pages:
                page_text = page.extract_text()
                print(page_text)  # Verifica el contenido extraído de cada página
                text += page_text
        
        values = extract_values_from_text(text)
        # extracted_data = {
        #     'atTG_IgA': None,
        #     'aDGP_IgA': None,
        #     'antiendomisio': None,
        #     'hemoglobina': None,
        #     'hematocrito': None,
        #     'ferritina': None,
        #     'hierro_serico': None,
        #     'vitamina_b12': None,
        #     'calcio_serico': None,
        #     'vitamina_d': None,
        #     'alt': None,
        #     'ast': None,
        #     'colesterol_total': None,
        #     'colesterol_hdl': None,
        #     'trigliceridos': None,
        #     'glucemia': None,
        # }

        # # Definir palabras clave y regex para capturar valores
        # patterns = {
        #     'atTG_IgA': r'atTG.*?\s(\d+\.?\d*)',
        #     'aDGP_IgA': r'aDGP.*?\s(\d+\.?\d*)',
        #     'antiendomisio': r'antiendomisio.*\s*(\d+\.?\d*)',
        #     'hemoglobina': r'Hemoglobina.*?\s(\d+\.?\d*)',
        #     'hematocrito': r'Hematocrito.*?\s(\d+\.?\d*)',
        #     'ferritina': r'Ferritina.*?\s(\d+\.?\d*)',
        #     'hierro_serico': r'Ferremia.*?\s(\d+\.?\d*)',
        #     'vitamina_b12': r'Vitamina B.*?\s(\d+\.?\d*)',
        #     'calcio_serico': r'Calcio Sérico.*?\s(\d+\.?\d*)',
        #     'vitamina_d': r'Vitamina D.*?\s(\d+\.?\d*)',
        #     'alt': r'ALT/GPT.*?\s(\d+\.?\d*)',
        #     'ast': r'AST/GOT.*?\s(\d+\.?\d*)',
        #     'colesterol_total': r'Colesterol Total.*?\s(\d+\.?\d*)',
        #     'colesterol_hdl': r'Colesterol HDL.*?\s(\d+\.?\d*)',
        #     'trigliceridos': r'Triglicéridos.*?\s(\d+\.?\d*)',
        #     'glucemia': r'Glucemia.*?\s(\d+\.?\d*)',
        # }

        # with pdfplumber.open(pdf_file) as pdf:
        #     # Extraer todas las líneas de texto
        #     all_text = ""
        #     for page in pdf.pages:
        #         all_text += page.extract_text()

        #     # Dividimos el texto por líneas para un análisis más detallado
        #     lines = all_text.split('\n')

        #     # Analizar cada línea buscando coincidencias
        #     for line in lines:
        #         for key, pattern in patterns.items():
        #             if extracted_data[key] is None:  # Solo si no se ha encontrado aún
        #                 match = re.search(pattern, line, re.IGNORECASE)
        #                 if match:
        #                     extracted_data[key] = match.group(1)

        # # Convertimos los valores 'None' en 'No encontrado' para mayor claridad
        # for key in extracted_data:
        #     if extracted_data[key] is None:
        #         extracted_data[key] = 'No encontrado'
        
        # Devolver el texto extraído
        return Response({"valores encontrados": values}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error al procesar el archivo PDF: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def extract_values_from_text(text):
    values = {}
#     patterns = {
#     'atTG_IgA': r'Anticuerpos IgA Anti-Transglutaminasa\s+([\d.]+)\s+U/mL',
#     'aDGP_IgA': r'Anticuerpos IgG Anti-Gliadinas Deaminadas\s+([\d.]+)\s+U/mL',
#     'antiendomisio': r'Antiendomisio\s*:\s*(\w+)',  # Necesito más contexto sobre cómo aparece en los análisis para ajustar
#     'hemoglobina': r'Hemoglobina\s+([\d.]+)\s+g/dL',
#     'hematocrito': r'Hematocrito\s+([\d.]+)\s+%',
#     'ferritina': r'Ferritina\s+([\d.]+)\s+ug/L',
#     'hierro_serico': r'Ferremia\s+([\d.]+)\s+ug/dL',  # Hierro Sérico también es llamado Ferremia
#     'vitamina_b12': r'Vitamina B-12\s+([\d.]+)\s+pg/mL',
#     'calcio_serico': r'Calcio Sérico\s+([\d.]+)\s+mg/dL',
#     'vitamina_d': r'Vitamina D\s*:\s*(\d+\.?\d*)',  # Asegúrate del formato exacto de vitamina D
#     'alt': r'ALT/GPT \(Alanina Aminotransferasa\)\s+([\d.]+)\s+U/L',
#     'ast': r'AST/GOT \(Aspartato Aminotransferasa\)\s+([\d.]+)\s+U/L',
#     'colesterol_total': r'Colesterol Total\s+([\d.]+)\s+mg/dL',
#     'colesterol_hdl': r'Colesterol HDL\s+([\d.]+)\s+mg/dL',
#     'trigliceridos': r'Triglicéridos\s+([\d.]+)\s+mg/dL',
#     'glucemia': r'Glucemia\s+([\d.]+)\s+mg/dL'
# }

#     patterns = {
#     'atTG_IgA': r'(?i)Anticuerpos\s+IgA\s+Anti-Transglutaminasa\s*[:\s]*([\d,.]+)',  
#     'aDGP_IgA': r'(?i)Anticuerpos\s+IgG\s+Anti-Gliadinas\s+Deaminadas\s*[:\s]*([\d,.]+)',
#     'antiendomisio': r'(?i)Antiendomisio\s*[:\s]*([\w]+)',
#     'hemoglobina': r'(?i)Hemoglobina\s*[:\s]*([\d,.]+)\s*[gG][/]?[dD][lL]',
#     'hematocrito': r'(?i)Hematocrito\s*[:\s]*([\d,.]+)\s*%',
#     'ferritina': r'(?i)Ferritina\s*[:\s]*([\d,.]+)\s*[ugUG]/[lL]',
#     'hierro_serico': r'(?i)(Ferremia|Hierro\s+Sérico)\s*[:\s]*([\d,.]+)\s*[ugUG]/[dD][lL]',
#     'vitamina_b12': r'(?i)Vitamina\s*B[-–]12\s*[:\s]*([\d,.]+)\s*[pgPG]/[mM][lL]',
#     'calcio_serico': r'(?i)(Calcemia|Calcio\s+Sérico)\s*[:\s]*([\d,.]+)\s*[mgMG]/[dD][lL]',
#     'vitamina_d': r'(?i)(Vitamina\s+D\s*(Total|D3)?)\s*[:\s]*([\d,.]+)',  # Variación de Vitamina D
#     'alt': r'(?i)ALT[/]GPT\s*\(?Alanina\s+Aminotransferasa\)?\s*[:\s]*([\d,.]+)\s*[uU][/]?[lL]',
#     'ast': r'(?i)AST[/]GOT\s*\(?Aspartato\s+Aminotransferasa\)?\s*[:\s]*([\d,.]+)\s*[uU][/]?[lL]',
#     'colesterol_total': r'(?i)(Colesterol\s+Total|Colesterolemia|Colesterol)\s*[:\s]*([\d,.]+)',
#     'colesterol_hdl': r'(?i)(HDL\s*Colesterol|HDL\s*Col|Colesterol\s*H\.?D\.?L)\s*[:\s]*([\d,.]+)',  
#     'colesterol_ldl': r'(?i)(LDL\s*Colesterol|LDL\s*Col|Colesterol\s*L\.?D\.?L)\s*[:\s]*([\d,.]+)',  
#     'trigliceridos': r'(?i)(Trigliceridemia|Triglicéridos)\s*[:\s]*([\d,.]+)',
#     'glucemia': r'(?i)(Glucemia|Glucosa)\s*[:\s]*([\d,.]+)\s*[mgMG]/[dD][lL]'
# }

    patterns = {
    'atTG_IgA': r'(?i)Anticuerpos\s+IgA\s+Anti-Transglutaminasa\s*[:\s]*([\d,.]+)\s*[Uu]/[Mm][Ll]*',  
    'aDGP_IgA': r'(?i)Anticuerpos\s+IgG\s+Anti-Gliadinas\s+Deaminadas\s*[:\s]*([\d,.]+)\s*[Uu]/[Mm][Ll]*',
    'antiendomisio': r'(?i)Antiendomisio\s*[:\s]*([\w]+)*',
    'hemoglobina': r'(?i)Hemoglobina\s*[:\s]*([\d,.]+)\s*[gG][/]?[dD][lL]*',
    'hematocrito': r'(?i)Hematocrito\s*[:\s]*([\d,.]+)\s*%*',
    'ferritina': r'(?i)Ferritina\s*[:\s]*([\d,.]+)\s*[uU][gG]/[lL]',
    'hierro_serico': r'(?i)(Ferremia|Hierro\s*(Sérico|S))\s*[:\s]*([\d,.]+)\s*[ugUG]/[dD][lL]*',  # Variantes más generales
    'vitamina_b12': r'(?i)Vitamina\s*B[-–]12\s*[:\s]*([\d,.]+)\s*[pgPG]/[mM][lL]*',
    'calcio_serico': r'(?i)(Calcemia|Calcio\s*(Sérico|S))\s*[:\s]*([\d,.]+)\s*[mgMG]/[dD][lL]*',
    'vitamina_d': r'(?i)(Vitamina\s+D\s*(Total|D3)?)\s*[:\s]*([\d,.]+)\s*[ngNG]/[mM][lL]*',  # Asegurándonos de capturar valores en ng/mL
    'alt': r'(?i)ALT[/]GPT\s*\(?Alanina\s+Aminotransferasa\)?\s*[:\s]*([\d,.]+)\s*[uU][/]?[lL]*',
    'ast': r'(?i)AST[/]GOT\s*\(?Aspartato\s+Aminotransferasa\)?\s*[:\s]*([\d,.]+)\s*[uU][/]?[lL]*',
    'colesterol_total': r'(?i)(Colesterol\s+Total|Colesterolemia|Colesterol)\s*[:\s]*([\d,.]+)\s*[mgMG]/[dD][lL]*',
    'colesterol_hdl': r'(?i)(HDL\s*Colesterol|HDL\s*Col|Colesterol\s*H\.?D\.?L)\s*[:\s]*([\d,.]+)\s*[mgMG]/[dD][lL]*',  
    'colesterol_ldl': r'(?i)(LDL\s*Colesterol|LDL\s*Col|Colesterol\s*L\.?D\.?L)\s*[:\s]*([\d,.]+)\s*[mgMG]/[dD][lL]*',  
    'trigliceridos': r'(?i)(Trigliceridemia|Triglicéridos)\s*[:\s]*([\d,.]+)\s*[mgMG]/[dD][lL]\s*(.*)?',
    'glucemia': r'(?i)(Glucemia|Glucosa)\s*[:\s]*([\d,.]+)\s*[mgMG]/[dD][lL]*'
}

    for key, pattern in patterns.items():
        match = re.search(pattern, text)
        if match:
            values[key] = match.group(1)
        else:
            values[key] = None

    return values

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def extract_values_from_pdf(request):
#     # Verificar si el archivo PDF fue enviado en la solicitud
#     pdf_file = request.FILES.get('file')

#     if not pdf_file:
#         return Response({"error": "No se ha enviado ningún archivo PDF."}, status=status.HTTP_400_BAD_REQUEST)
#     try: 
#         resultados = {
#             "IgA anti Transglutaminasa": None,
#             "IgG anti Gliadina Deaminada": None,
#             "Anticuerpos antiendomisio (EMA)": None,
#             "Hemoglobina": None,
#             "Hematocrito": None,
#             "Ferritina": None,
#             "Hierro sérico": None,
#             "Vitamina B12": None,
#             "Calcio sérico": None,
#             "Vitamina D": None,
#             "ALT": None,
#             "AST": None,
#             "Colesterol total": None,
#             "Colesterol LDL": None,
#             "Colesterol HDL": None,
#             "Triglicéridos": None,
#             "Glucemia": None
#         }

#         with pdfplumber.open(pdf_file) as pdf:
#             for pagina in pdf.pages:
#                 texto_pagina = pagina.extract_text().lower()
                
#                 # Buscamos cada variable en el texto de la página
#                 for variable, valor in resultados.items():
#                     patron = f"{variable}|{variable.upper()}:|{variable.capitalize()}|{variable.replace(' ', '')}"
#                     coincidencias = re.findall(patron, texto_pagina)
                    
#                     if coincidencias:
#                         valor_coincidencia = coincidencias[0].split('|')[-1].strip()
                        
#                         # Manejamos diferentes formas de escribir las unidades
#                         unidades = ['mg/dL', 'g/L', 'IU/mL', 'mMol/L', 'ng/mL']
#                         for unidad in unidades:
#                             if unidad in valor_coincidencia:
#                                 valor_coincidencia = valor_coincidencia.replace(unidad, '')
                        
#                         # Intentamos convertir el valor a float
#                         try:
#                             valor_coincidencia = float(valor_coincidencia.strip())
#                         except ValueError:
#                             pass
                        
#                         resultados[variable] = valor_coincidencia
        
#         return Response({"valores encontrados": resultados}, status=status.HTTP_200_OK)
    
#     except Exception as e:
#         return Response({"error": f"Error al procesar el archivo PDF: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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