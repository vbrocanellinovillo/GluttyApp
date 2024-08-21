from django.shortcuts import render, get_object_or_404
from .models import *
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.conf import settings
# from drf_yasg.utils import swagger_auto_schema
from .models import User
from comercios.models import Commerce, Branch
from .serializers import *
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import ValidationError
import cloudinary.uploader
from django.core.files.storage import default_storage
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from PyPDF2 import PdfReader
from io import BytesIO

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
            "location": branch.location,
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
    # username = request.data["username"]
    # user = User.objects.filter(username=username).first()
    username = request.user.username
    user = User.objects.filter(username=username).first()
    try:
        if user.is_commerce:
            user_commerce = Commerce.objects.filter(user=user).first()
            
            new_branch = Branch.objects.create(
                        commerce=user_commerce,
                        name=request.data.get("name"),
                        phone=request.data.get("phone"),
                        optional_phone=request.data.get("optional_phone"),
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
            
            return Response({"detail": "Sucursal cargada correctamente."}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error:" f"No está habilitado a realizar esta función"}, status=status.HTTP_400_BAD_REQUEST)
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

            Menu.objects.create(commerce=commerce, menu_url=upload_result['url'])

        # Guardar URLs si fueron proporcionadas
        for file_url in file_urls:
            Menu.objects.create(commerce=commerce, menu_url=file_url)

        return Response({"detail": "Menús subidos correctamente."}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_menu(request):
    user = request.user
    commerce = get_object_or_404(Commerce, user=user)

    menus = commerce.menu.all()
    if menus.exists():
        menu_urls = [{"menu_url": menu.menu_url} for menu in menus]
        return Response(menu_urls, status=status.HTTP_200_OK)
    else:
        return Response({"error": "No se encontraron menús."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_menu(request):
    user = request.user
    commerce = get_object_or_404(Commerce, user=user)

    # Obtener la lista de menús a eliminar
    menu_urls = request.data.getlist("menu_urls")

    if not menu_urls:
        return Response({"error": "No se han proporcionado URLs de menús para eliminar."}, status=status.HTTP_400_BAD_REQUEST)

    for url in menu_urls:
        menu = get_object_or_404(Menu, commerce=commerce, menu_url=url)

        # Extraer el public_id de la URL del archivo y eliminarlo de Cloudinary
        if menu.menu_url.startswith("http://res.cloudinary.com/") or menu.menu_url.startswith("https://res.cloudinary.com/"):
            public_id = menu.menu_url.split('/')[-1].split('.')[0]
            cloudinary.uploader.destroy(public_id, resource_type='auto')

        # Eliminar el registro de la base de datos
        menu.delete()

    return Response({"detail": "Menús eliminados correctamente."}, status=status.HTTP_204_NO_CONTENT)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_branches(request):
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
        
        # Agregar los datos de las sucursales al diccionario de datos del comercio
        # commerce_data["branches"] = branch_data
        
        # Agregar el comercio completo a la lista de todos los comercios
            all_branches_data.append(branch_data)
            
        # Devolver los datos    
        return Response({"branches": all_branches_data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
        