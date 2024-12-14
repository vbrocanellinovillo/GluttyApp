from datetime import timedelta
from django.http import StreamingHttpResponse
from django.shortcuts import get_object_or_404
import requests
from .models import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
import cloudinary.uploader
import cloudinary.api
from usuarios.image import upload_to_cloudinary
from .validations import *
from django.db.models import Q
from .serializers import LocationSerializer
from comercios.models import Commerce, Branch
from comunidad.models import *
from django.db import connection, transaction
import json
from collections import Counter
from django.db.models import Count, Subquery
from datetime import timedelta
from django.utils.timezone import now

# Función para buscar el comercio según una query y filtros
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def search_commerce(request):
    try:
        query = request.data.get("q", "").strip()
        separated_kitchen = request.data.get("separated_kitchen", None)
        just_takeaway = request.data.get("just_takeaway", None)

        print('hola' + query)
        # Filtros base para sucursales activas
        branch_filter = Q(is_active=True)

        # Aplicar filtro solo si separated_kitchen es True (si es False o None, no se aplica)
        if separated_kitchen is True:
            branch_filter &= Q(separated_kitchen=True)

        # Aplicar filtro solo si just_takeaway es True (si es False o None, no se aplica)
        if just_takeaway is True:
            branch_filter &= Q(just_takeaway=True)

        if query:
            # Filtro por coincidencia de nombre, cuit o descripción en Commerce,
            # o dirección en Location, o nombre de la sucursal en Branch
            branch_filter &= (
                Q(commerce__name__icontains=query) |
                Q(commerce__cuit__icontains=query) |
                Q(commerce__description__icontains=query) |
                Q(location__address__icontains=query) |
                Q(name__icontains=query)
            )

        branches = Branch.objects.filter(branch_filter).select_related('commerce', 'location')

        # Preparar los datos de respuesta
        response_data = {"branches": []}

        i = 0
        for branch in branches:
            i += 1
            location = branch.location
            branch_data = {
                "id": branch.id,
                "branch_name": branch.name,
                "address": location.address if location else None,
                "separated_kitchen": branch.separated_kitchen,
                "just_takeaway": branch.just_takeaway,
                "latitude": location.latitude if location else None,
                "longitude": location.longitude if location else None,
                "commerce_name": branch.commerce.name,
                "profile_picture": branch.commerce.user.profile_picture
            }
            print("esta es la query:" + query)
            print("Encontradas: " + str(i))
            response_data["branches"].append(branch_data)

        connection.close()
        return Response(response_data, status=200)

    except Exception as e:
        import traceback
        print(f"Error: {str(e)}")
        print(traceback.format_exc())
        connection.close()
        return Response({"error": "Ocurrió un error interno en el servidor."}, status=500)

def get_commerce_info(user):
    # Obtenemos el comercio asociado al usuario
    commerce = get_object_or_404(Commerce, user=user)
    
    # Información del comercio
    commerce_data = {
        "name": commerce.name,
        "cuit": commerce.cuit,
        "description": commerce.description,
    }
    
    # Información de las sucursales
    branches = Branch.objects.filter(commerce=commerce, is_active=True)
    branch_data = [
        {
            "name": branch.name,
            "address": branch.location.address,
            "latitude": branch.location.latitude,
            "longitude": branch.location.longitude
            # "phone": branch.phone,
            # "optional_phone": branch.optional_phone,
            # "separated_kitchen": branch.separated_kitchen,
            # "just_takeaway": branch.just_takeaway
        } for branch in branches
    ]
    
    return commerce_data, branch_data

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def add_branch(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    try:
        if user.is_commerce:
            user_commerce = Commerce.objects.filter(user=user).first()
             
            optional_phone = request.data.get("optional_phone")
            if optional_phone:
                validate_phone(optional_phone)
            
            # Crear nueva sucursal
            new_branch = Branch.objects.create(
                        commerce=user_commerce,
                        name=request.data.get("name"),
                        phone=validate_phone(request.data.get("phone")),
                        optional_phone=optional_phone,
                        separated_kitchen=request.data.get("separated_kitchen"),
                        just_takeaway=request.data.get("just_takeaway"),
                    )
            new_branch.save()
            
            # Crear location para la nueva sucursal
            new_location = Location.objects.create(
                branch=new_branch,
                address=request.data.get("address"),
                latitude=request.data.get("latitude"),
                longitude=request.data.get("longitude"),
            )
            new_location.save()
            
            # Crear horarios para la nueva sucursal
            schedules = request.data.get("schedules", "[]")
            try:
                schedules = json.loads(schedules)  # Convierte la cadena JSON en un array de Python
            except json.JSONDecodeError:
                schedules = []  # En caso de error, asignar un array vacío

            for schedule in schedules:
                min_time = schedule["min_time"]
                max_time = schedule["max_time"]
                
                # Validar que max_time sea mayor que min_time
                if max_time <= min_time:
                    return Response(
                        {"error": f"El horario para el día {schedule['day']} tiene un 'max_time' menor o igual a 'min_time'."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                
                # Crear el horario si es válido
                Schedule.objects.create(
                    branch=new_branch,
                    day=schedule["day"],
                    min_time=min_time,
                    max_time=max_time,
                )
                
            schedules = new_branch.schedules.all()
            schedule_data = [
                {
                    "id": schedule.id,
                    "day": schedule.get_day_display(),
                    "min_time": schedule.min_time,
                    "max_time": schedule.max_time,
                }
                for schedule in schedules
            ]

            # Obtener los datos de la sucursal recién creada
            branch_data = {
                "id": new_branch.id,
                "name": new_branch.name,
                "phone": new_branch.phone,
                "optional_phone": new_branch.optional_phone,
                "address": new_location.address,
                "latitude": new_location.latitude,
                "longitude": new_location.longitude,
                "separated_kitchen": new_branch.separated_kitchen,
                "just_takeaway": new_branch.just_takeaway,
                "schedules": schedule_data,
            }
            
            # Manejar imágenes de la sucursal 
            images = request.FILES.getlist("image")
            print("imagen:" + str(images))
            
            if images:
                try:
                    #for image in images:
                    print("hola"+str(images))
                    for image in images:
                        picture_link, public_id = upload_to_cloudinary(image)
                        new_picture = PictureBranch.objects.create(branch=new_branch, photo_url=picture_link, public_id=public_id)
                        new_picture.save()
                except Exception as e:
                    raise ValidationError(f"Error al subir la imagen: {str(e)}")
            
            return Response(branch_data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "No está habilitado a realizar esta función"}, status=status.HTTP_400_BAD_REQUEST)
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_branch(request):
    branch_id = request.data.get("branch_id")
    if not branch_id:
        return Response({"error": "El ID de la sucursal es requerido."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        branch = get_object_or_404(Branch, id=branch_id)
        schedules = branch.schedules.all()
        schedule_data = [
            {
                "id": schedule.id,
                "day": schedule.get_day_display(),
                "min_time": schedule.min_time,
                "max_time": schedule.max_time,
            }
            for schedule in schedules
        ]
        branch_data = {
            "commerce_name": branch.commerce.name,
            "commerce_picture": branch.commerce.user.profile_picture,
            "commerce_description": branch.commerce.description,
            "id": branch.id,
            "name": branch.name,
            "phone": branch.phone,
            "optional_phone": branch.optional_phone,
            "address": branch.location.address,
            "latitude": branch.location.latitude,
            "longitude": branch.location.longitude,
            "separated_kitchen": branch.separated_kitchen,
            "just_takeaway": branch.just_takeaway,
            "schedules": schedule_data,
            "is_open_now": branch.is_open_now(),
        }
        
        branch_data["menus"] = []
        
        for menu in branch.commerce.menu.all():
            if menu.menu_url:
                resource = cloudinary.api.resource(menu.public_id, resource_type="image")
                pdf_info = {
                    "file_name": resource.get("display_name"),
                    "file_size_kb": round(resource.get("bytes", 0) / 1024, 2),  # Tamaño en KB
                    "url": menu.menu_url,
                    "id": menu.id
                }
            branch_data["menus"].append(pdf_info)
        
        branch_pictures = PictureBranch.objects.filter(branch=branch)
        # Agregar las fotos con los id
        photos_data = [{"id": picture.id, "url": picture.photo_url} for picture in branch_pictures if branch.is_active]
        branch_data["photos"] = photos_data
        
        username = request.user.username
        user = User.objects.filter(username=username).first()

        user_commerce = branch.commerce.user
        
        # Agregar una vista a la sucursal si no es el mismo comercio quien la ve
        if user != user_commerce:
            new_view = BranchView.objects.create(
                    branch=branch,
                    user=user
                )
            new_view.save()
        
        connection.close()
        return Response(branch_data, status=status.HTTP_200_OK)
    except Exception as e:
        connection.close()
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def update_branch(request):
    branch_id = request.data.get("branch_id")
    if not branch_id:
        return Response({"error": "El ID de la sucursal es requerido."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        branch = get_object_or_404(Branch, id=branch_id)

        # Verificar si el usuario tiene permisos para actualizar la sucursal
        user = request.user
        if not user.is_commerce or branch.commerce.user != user:
            return Response({"error": "No está habilitado a realizar esta función"}, status=status.HTTP_403_FORBIDDEN)
        
        # Actualizar la sucursal con los datos proporcionados
        branch.name = request.data.get("name", branch.name)
        branch.phone = request.data.get("phone", branch.phone)
        branch.optional_phone = request.data.get("optional_phone", branch.optional_phone)
        branch.separated_kitchen = request.data.get("separated_kitchen", branch.separated_kitchen)
        branch.just_takeaway = request.data.get("just_takeaway", branch.just_takeaway)
        branch.save()
        
        # Actualizar la ubicación relacionada (Location)
        location = branch.getLocation()
        location_serializer = LocationSerializer(location, data=request.data, partial=True)
        if location_serializer.is_valid():
            location_serializer.save()
        else:
            return Response({"error": location_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        # Actualizar horarios
        # Actualizar horarios
        schedules = request.data.get("schedules", "[]")
        try:
            schedules = json.loads(schedules)  # Convierte la cadena JSON en un array de Python
        except json.JSONDecodeError:
            schedules = []  # En caso de error, asignar un array vacío

        if schedules:
            branch.deleteSchedules()

        for schedule in schedules:
            min_time = schedule["min_time"]
            max_time = schedule["max_time"]
            
            # Validar que max_time sea mayor que min_time
            if max_time <= min_time:
                return Response(
                    {"error": f"El horario para el día {schedule['day']} tiene un 'max_time' menor o igual a 'min_time'."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            
            # Crear el horario si es válido
            Schedule.objects.create(
                branch=branch,
                day=schedule["day"],
                min_time=min_time,
                max_time=max_time,
            )

        
        # Manejar eliminación de imágenes específicas
        image_ids_to_delete = request.data.get("image_ids_to_delete", "[]")  # Obtiene la cadena JSON
        try:
            image_ids_to_delete = json.loads(image_ids_to_delete)  # Convierte la cadena JSON en un array de Python
        except json.JSONDecodeError:
            image_ids_to_delete = []  # En caso de error, asignar un array vacío
        print("imagenes a borrar: ", image_ids_to_delete)
        for image_id in image_ids_to_delete:
            branch.deletePicture(image_id)
            
        # Agregar nuevas imágenes si las hay
        images = request.FILES.getlist("image")
        if images:
            try:
                #for image in images:
                print("hola"+str(images))
                for image in images:
                    picture_link, public_id = upload_to_cloudinary(image)
                    new_picture = PictureBranch.objects.create(branch=branch, photo_url=picture_link, public_id=public_id)
                    new_picture.save()
            except Exception as e:
                raise ValidationError(f"Error al subir la imagen: {str(e)}")

        return Response({"detail": "Sucursal actualizada correctamente."}, status=status.HTTP_200_OK)
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_branch(request):
    branch_id = request.data.get("branch_id")
    if not branch_id:
        return Response({"error": "El ID de la sucursal es requerido."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Encontrar la branch que se quiere eliminar
        branch = get_object_or_404(Branch, id=branch_id)

        # Verificar si el usuario tiene permisos para actualizar la sucursal
        user = request.user
        if not user.is_commerce or branch.commerce.user != user:
            connection.close()
            return Response({"error": "No está habilitado a realizar esta función"}, status=status.HTTP_403_FORBIDDEN)

        # Actualizar la sucursal con los datos proporcionados
        branch.is_active = False
        branch.save()
        connection.close()
        return Response({"detail":"Se eliminó la sucursal."}, status=status.HTTP_200_OK)
                        
    except ValidationError as e:
        connection.close()
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        connection.close()
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_menu(request):
    try:
        user = request.user
        commerce = get_object_or_404(Commerce, user=user)

        # Obtener múltiples archivos o URLs de menú
        files = request.FILES.getlist('menu')
        file_urls = request.data.getlist('menu_url')

        if not files and not file_urls:
            return Response({"error": "No se ha proporcionado ni un archivo ni un enlace."}, status=status.HTTP_400_BAD_REQUEST)

        # Subir y guardar cada menú
        for file in files:
            file_type = file.content_type

            if file_type not in ["image/jpeg", "image/png", "application/pdf"]:
                return Response({"error": "Formato de archivo no soportado. Solo se permiten imágenes y PDFs."}, status=status.HTTP_400_BAD_REQUEST)

            original_filename = file.name
            upload_result = cloudinary.uploader.upload(
                file,
                resource_type='auto',
                public_id=f"{user.username}/{original_filename}"
            )

            Menu.objects.create(commerce=commerce, menu_url=upload_result['url'], public_id=upload_result['public_id'])

        # Guardar URLs si fueron proporcionadas
        for file_url in file_urls:
            Menu.objects.create(commerce=commerce, menu_url=file_url)

        connection.close()
        return Response({"detail": "Menús subidos correctamente."}, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_menu(request):
    menu_id = request.data.get("id")
    if not menu_id:
        return Response({"error": "El ID del menú es requerido."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Encontrar el comercio que quiere encontrar el menu
        user = request.user
        commerce = get_object_or_404(Commerce, user=user)

        # Verificar si el usuario tiene permisos para actualizar la sucursal
        if not user.is_commerce or commerce.user != user:
            return Response({"error": "No está habilitado a realizar esta función"}, status=status.HTTP_403_FORBIDDEN)
    
        # Obtener el menú basado en el ID proporcionado
        menu = get_object_or_404(Menu, id=menu_id)

        if not menu.menu_url:
            return Response({"error": "El menú solicitado no tiene un archivo asociado."}, status=status.HTTP_404_NOT_FOUND)

        # Realizar la solicitud al URL del PDF
        response = requests.get(menu.menu_url, stream=True)
        
        # Verificar que la solicitud fue exitosa
        if response.status_code != 200:
            return Response({"error": "No se pudo recuperar el archivo PDF."}, status=response.status_code)

        # Determinar el tipo de contenido
        content_type = response.headers.get('Content-Type', 'application/pdf')

        # Crear una respuesta HTTP con el PDF directamente
        response = StreamingHttpResponse(streaming_content=response.iter_content(chunk_size=8192), content_type=content_type)
        response['Content-Disposition'] = f'inline; filename="{menu.public_id}.pdf"'

        connection.close()
        return response

    except Exception as e:
        connection.close()
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_menues(request):
    try:
        # Encontrar el comercio que quiere encontrar el menu
        user = request.user
        commerce = get_object_or_404(Commerce, user=user)

        # Verificar si el usuario tiene permisos para actualizar la sucursal
        if not user.is_commerce or commerce.user != user:
            return Response({"error": "No está habilitado a realizar esta función"}, status=status.HTTP_403_FORBIDDEN)

        menus = commerce.menu.all()
        all_menu_data = []
        
        for menu in menus:
            resource = cloudinary.api.resource(menu.public_id, resource_type="image")

            # Extraer el nombre del archivo y el tamaño
            file_name = resource.get("display_name")
            file_size = resource.get("bytes", 0)  # El tamaño en bytes
            
            # Convertir el tamaño a megabytes
            file_size_kb = round(file_size / 1024, 2)
            
            # Url
            file_url = resource.get("secure_url")
        
            menu_data = {
                "id": menu.id,
                "file_name": file_name,
                "file_size": file_size_kb,
                "file_url": file_url
            }
        
        # Agregar el comercio completo a la lista de todos los comercios
            all_menu_data.append(menu_data)
            
        # Devolver los datos
        connection.close()  
        return Response({"menues": all_menu_data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def delete_menu(request):
    try: 
        user = request.user
        commerce = get_object_or_404(Commerce, user=user)

        # Obtener la lista de menús a eliminar
        menu_id = request.data.get("id")
        
        if not menu_id:
            return Response({"error": "No se han proporcionado menús para eliminar."}, status=status.HTTP_400_BAD_REQUEST)

        # for url in menu_urls:
        menu = get_object_or_404(Menu, commerce=commerce, id = menu_id)
    
        # Extraer el public_id de la URL del archivo y eliminarlo de Cloudinary
        if menu.public_id and (menu.menu_url.startswith("http://res.cloudinary.com/") or menu.menu_url.startswith("https://res.cloudinary.com/")):
            #public_id = menu.menu_url.split('/')[-1].split('.')[0]
            print(menu.public_id)
            #cloudinary.uploader.destroy(menu.public_id, resource_type='raw')
            #cloudinary.api.delete_resources(menu.public_id, resource_type="raw", type="upload")
            pdf_delete_result = cloudinary.api.delete_resources(menu.public_id, resource_type="image", type="upload")
            print(pdf_delete_result)
            
            # Eliminar el registro de la base de datos
            menu.delete()
            return Response({"detail": "Menú eliminado correctamente."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "No se encontró el public_id para eliminar el archivo."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_branches_address(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    try:
        # commerces = Commerce.objects.all()
        all_branches_data = []
        # for commerce in commerces:
        #     commerce_data = {
        #     "name": commerce.name,
        #     "cuit": commerce.cuit,
        #     "description": commerce.description,
        #     }
        branches = Branch.objects.filter(is_active=True)
        for branch in branches:
            branch_data = {
                "id": branch.id,
                #"name": branch.name,
                #"address": branch.location.address,
                "latitude": branch.location.latitude,
                "longitude": branch.location.longitude,
                #"phone": branch.phone,
                #"optional_phone": branch.optional_phone,
                #"separated_kitchen": branch.separated_kitchen,
                #"just_takeaway": branch.just_takeaway
            }
        
        # Agregar el comercio completo a la lista de todos los comercios
            all_branches_data.append(branch_data)
            
        # Devolver los datos    
        return Response({"branches": all_branches_data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
        
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_branches(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    try:
        all_branches_data = []
       #Se agregan todas las branches del comercio con el que se accede.
        commerce = Commerce.objects.filter(user=user).first()
        # Obtener un solo objeto de comercio asociado al usuario
        #commerce = Commerce.objects.get(user=user)
        branches = Branch.objects.filter(is_active__exact=True, commerce=commerce)
        for branch in branches:
            branch_data = {
                "id": branch.id,
                "name": branch.name,
                "address": branch.location.address,
            }
        
        # Agregar los datos de las sucursales al diccionario de datos del comercio
        # commerce_data["branches"] = branch_data
        
        # Agregar el comercio completo a la lista de todos los comercios
            all_branches_data.append(branch_data)
            
        # Devolver los datos
        connection.close()  
        return Response({"branches": all_branches_data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        connection.close()
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_info_dashboard(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    commerce = Commerce.objects.filter(user=user).first()

    # Validar si el comercio existe
    if not commerce:
        return Response({"error": "Comercio no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    # Obtener filtro de tiempo desde el request
    filter_time = request.data.get("filter_time")
    if not filter_time:
        return Response({"error": "El tiempo para filtrar es requerido."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Mapear filtro de tiempo a días
        if filter_time == "week":
            filter_days = 7
        elif filter_time == "fortnight":
            filter_days = 15
        elif filter_time == "month":
            filter_days = 30
        elif filter_time == "quarter":
            filter_days = 90
        else:
            return Response({"error": "Filtro de tiempo no válido."}, status=status.HTTP_400_BAD_REQUEST)

        # Calcular fecha límite para el filtro
        date_threshold = now() - timedelta(days=filter_days)

        # 1. Cantidad de likes, comentarios y favoritos (de publicaciones del comercio)
        posts = Post.objects.filter(user=commerce.user)
        likes_count = Like.objects.filter(post__in=posts, created_at__gte=date_threshold).count()
        comments_count = Comment.objects.filter(post__in=posts, created_at__gte=date_threshold).count()
        favorites_count = Favorite.objects.filter(post__in=posts, created_at__gte=date_threshold).count()

        # 2. Rango de edades de usuarios celiacos que dieron like a publicaciones dentro del tiempo filtrado
        likes = Like.objects.filter(post__in=posts, created_at__gte=date_threshold)
        celiac_users = Celiac.objects.filter(user__in=likes.values("user"))

        # Calcular distribución de edades
        age_distribution = Counter()
        for celiac in celiac_users:
            age = celiac.calculateAge()
            if age <= 18:
                age_distribution["0 - 18"] += 1
            elif 18 < age <= 35:
                age_distribution["18 - 35"] += 1
            elif 35 < age <= 60:
                age_distribution["35 - 60"] += 1
            else:
                age_distribution["+60"] += 1

        # Calcular porcentajes del total
        total_celiacs = len(celiac_users)
        age_percentages = [
            {"label": "0 - 18", "percentage": int((age_distribution["0 - 18"] / total_celiacs) * 100) if total_celiacs > 0 else 0},
            {"label": "18 - 35", "percentage": int((age_distribution["18 - 35"] / total_celiacs) * 100) if total_celiacs > 0 else 0},
            {"label": "35 - 60", "percentage": int((age_distribution["35 - 60"] / total_celiacs) * 100) if total_celiacs > 0 else 0},
            {"label": "+60", "percentage": int((age_distribution["+60"] / total_celiacs) * 100) if total_celiacs > 0 else 0},
        ]

        # 3. Top 3 sucursales más vistas dentro del tiempo filtrado
        branch_views = BranchView.objects.filter(branch__commerce=commerce, created_at__gte=date_threshold, branch__is_active__exact=True)
        top_branches = (
            branch_views.values("branch__name")
            .annotate(view_count=Count("id"))
            .order_by("-view_count")[:3]
        )
        top_branches_list = [{"branch": b["branch__name"], "views": b["view_count"]} for b in top_branches]

        # 4. Top 3 publicaciones más likeadas dentro del tiempo filtrado
        # Obtener los IDs de los tres posteos más likeados
        top_liked_posts_ids = (
            Like.objects.filter(post__in=posts, created_at__gte=date_threshold)
            .values("post_id")  # Solo los IDs de los posteos
            .annotate(like_count=Count("id"))
            .order_by("-like_count")[:3]
        )

        # Obtener los objetos Post correspondientes
        top_liked_posts = Post.objects.filter(id__in=Subquery(top_liked_posts_ids.values("post_id")))
        
        print(top_liked_posts)
        
        top_posts_list = [
            {"post_id": post.id,
             "user": post.user.username,
             "name": Post.get_name(post.user),
             "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
             "body": post.body,
             "created_at": post.created_at,
             "likes": post.likes_number,
             "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
             "comments_number": post.comments_number,
             "likes": post.likes_number,
             "labels": [label.label.name for label in post.labels.all()]}
            for post in top_liked_posts
        ]
        
        connection.close()
        # Respuesta final
        return Response({
            "likes": likes_count,
            "comments": comments_count,
            "favorites": favorites_count,
            "age_distribution": age_percentages,
            "top_branches": top_branches_list,
            "top_posts": top_posts_list,
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)