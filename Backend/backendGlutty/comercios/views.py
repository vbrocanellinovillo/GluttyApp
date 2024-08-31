from django.http import StreamingHttpResponse
from django.shortcuts import render, get_object_or_404
import requests
from .models import *
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.conf import settings
from django.core.exceptions import ValidationError
import cloudinary.uploader
import cloudinary.api
from django.core.files.storage import default_storage
from PyPDF2 import PdfReader
from io import BytesIO
from usuarios.image import upload_to_cloudinary
from .validations import *
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector
from django.db.models import Q
from .serializers import CommerceSerializer, BranchSerializer, LocationSerializer
from comercios.models import Commerce, Branch
from comercios.serializers import CommerceSerializer, BranchSerializer
from django.db import transaction



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def search_commerce(request):
    try:
        query = request.data.get("q", None)
        separated_kitchen = request.data.get("separated_kitchen", None)
        just_takeaway = request.data.get("just_takeaway", None)

        # Inicializar el filtro de sucursales
        branch_filter = Q(is_active=True)
        commerce_filter = Q()

        if separated_kitchen is not None:
            branch_filter &= Q(separated_kitchen=separated_kitchen)

        if just_takeaway is not None:
            branch_filter &= Q(just_takeaway=just_takeaway)

        # Verificar si se proporcionó una consulta de búsqueda
        if query:
            search_query = SearchQuery(query, config='spanish')
            # Buscar los comercios que cumplen con los filtros adicionales y la búsqueda
            commerces = Commerce.objects.filter(
                commerce_filter,
                Q(search_vector=search_query)
            ).distinct()
            
            # Obtener sucursales relacionadas con estos comercios y aplicar los filtros adicionales
            branches = Branch.objects.filter(
                commerce__in=commerces,
                is_active=True
            ).filter(branch_filter).select_related('commerce', 'location')

        else:
            # Si no se proporcionó consulta, solo aplicar filtros a las sucursales
            branches = Branch.objects.filter(
                branch_filter
            ).select_related('commerce', 'location')

            # Obtener los comercios relacionados con las sucursales filtradas
            commerces = Commerce.objects.filter(
                id__in=branches.values('commerce')
            ).distinct()

        # Serializar los datos
        commerce_serializer = CommerceSerializer(commerces, many=True)
        branch_serializer = BranchSerializer(branches, many=True)

        results = {
            "commerces": commerce_serializer.data,
            "branches": branch_serializer.data,
        }

        return Response(results, status=200)

    except Exception as e:
        print(f"Error: {str(e)}")
        return Response(
            {"error": "Ocurrió un error interno en el servidor."}, status=500
        )


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
            
            # Crear nueva sucursal
            new_branch = Branch.objects.create(
                        commerce=user_commerce,
                        name=request.data.get("name"),
                        phone=validate_phone(request.data.get("phone")),
                        optional_phone=validate_phone(request.data.get("optional_phone")),
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
            }
            
            # Manejar la imagen de perfil si se proporciona
            images = request.FILES.getlist('image')
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
        }
        photos_data = []
        branch_pictures = PictureBranch.objects.filter(branch=branch)
        for picture in branch_pictures:
            photos_data.append(picture.photo_url)
        branch_data["pictures"] = photos_data
        
        return Response(branch_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
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
        branch.location.address = request.data.get("address", branch.location.address)
        branch.location.latitude = request.data.get("latitude", branch.location.latitude)
        branch.location.longitude = request.data.get("longitude", branch.location.longitude)
        branch.separated_kitchen = request.data.get("separated_kitchen", branch.separated_kitchen)
        branch.just_takeaway = request.data.get("just_takeaway", branch.just_takeaway)
        
        branch.save()

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
            return Response({"error": "No está habilitado a realizar esta función"}, status=status.HTTP_403_FORBIDDEN)

        # Actualizar la sucursal con los datos proporcionados
        branch.is_active = False
        branch.save()
        return Response({"detail":"Se eliminó la sucursal."}, status=status.HTTP_200_OK)
                        
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
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

        return Response({"detail": "Menús subidos correctamente."}, status=status.HTTP_200_OK)

    except Exception as e:
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

        return response

    except Exception as e:
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
        
            menu_data = {
                "id": menu.id,
                "file_name": file_name,
                "file_size": file_size_kb,
            }
        
        # Agregar el comercio completo a la lista de todos los comercios
            all_menu_data.append(menu_data)
            
        # Devolver los datos    
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
        branches = Branch.objects.filter(is_active=True, commerce=commerce)
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
        return Response({"branches": all_branches_data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 