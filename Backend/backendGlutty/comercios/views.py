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
def add_branch(request):
    username = request.data["username"]
    user = User.objects.filter(username=username).first()
    try:
        if user.is_commerce:
            user_commerce = Commerce.objects.filter(user=user).first()
            # branch_serializer = BranchSerializer(data=request.data)
            new_branch = Branch.objects.create(
                        commerce=user_commerce,
                        name=request.data.get("name"),
                        phone=request.data.get("phone"),
                        optional_phone=request.data.get("optional_phone"),
                        location=request.data.get("location"),
                        separated_kitchen=request.data.get("separated_kitchen"),
                        just_takeaway=request.data.get("just_takeaway"),
                    )
            new_branch.save()
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
            "location": branch.location,
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
        branch.location = request.data.get("location", branch.location)
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

        # Verificar si se ha subido un archivo o proporcionado un enlace
        file = request.FILES.get('menu')
        file_url = request.data.get('menu_url')

        if file:
            file_type = file.content_type

            # Verificamos si el archivo es una imagen o un PDF
            if file_type not in ["image/jpeg", "image/png", "application/pdf"]:
                return Response({"error": "Formato de archivo no soportado. Solo se permiten imágenes y PDFs."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Usar el nombre original del archivo
            original_filename = file.name
            
            # Subir el archivo a Cloudinary
            upload_result = cloudinary.uploader.upload(
                file,
                resource_type='auto',
                public_id=f"{user.username}/{original_filename}"  # Puedes modificar esto según tu lógica
            )

            # Si es un PDF, contamos las páginas
            # num_pages = None
            # if file_type == "application/pdf":
            #     pdf_file = BytesIO(file.read())
            #     pdf = PdfReader(pdf_file)
            #     num_pages = len(pdf.pages)

            # Guardamos la información del archivo en el comercio
            commerce.menu_url = upload_result['url']
            # commerce.menu_pages = num_pages
        elif file_url:
            # Guardar la URL del archivo en el comercio
            commerce.menu_url = file_url
            commerce.menu_pages = None
        else:
            return Response({"error": "No se ha proporcionado ni un archivo ni un enlace."}, status=status.HTTP_400_BAD_REQUEST)

        commerce.save()

        response_data = {
            "menu_url": commerce.menu_url,
            "num_pages": commerce.menu_pages,
        }
        
        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_menu(request):
    user = request.user
    commerce = get_object_or_404(Commerce, user=user)
    
    if commerce.menu_url:
        return Response({"menu_url": commerce.menu_url}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "No menu file found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_menu(request):
    user = request.user
    commerce = get_object_or_404(Commerce, user=user)
    
    if commerce.menu_url:
        # Extraer el public_id de la URL del archivo
        public_id = commerce.menu_url.split('/')[-1].split('.')[0]
        
        # Eliminar el archivo de Cloudinary
        cloudinary.uploader.destroy(public_id, resource_type='auto')
        
        # Eliminar la URL del archivo del modelo
        commerce.menu_url = None
        commerce.save()
        
        return Response({"detail": "Menu file deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"error": "No menu file found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_menu(request):
    try:
        user = request.user
        commerce = get_object_or_404(Commerce, user=user)

        # Verificar si se ha subido un archivo o proporcionado un enlace
        file = request.FILES.get('menu')
        file_url = request.data.get('menu_url')

        if file:
            file_type = file.content_type

            # Verificamos si el archivo es una imagen o un PDF
            if file_type not in ["image/jpeg", "image/png", "application/pdf"]:
                return Response({"error": "Formato de archivo no soportado. Solo se permiten imágenes y PDFs."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Usar el nombre original del archivo
            original_filename = file.name
            
            # Si existe un archivo de menú anterior, eliminarlo de Cloudinary
            if commerce.menu_url and (commerce.menu_url.startswith("http://res.cloudinary.com/") or commerce.menu_url.startswith("https://res.cloudinary.com/")):
                public_id = commerce.menu_url.split('/')[-1].split('.')[0]
                cloudinary.uploader.destroy(public_id, resource_type='auto')

            # Subir el nuevo archivo a Cloudinary
            upload_result = cloudinary.uploader.upload(
                file,
                resource_type='auto',
                public_id=f"{user.username}/{original_filename}"  # Puedes modificar esto según tu lógica
            )

            file_url = upload_result['secure_url']
            
            # Si es un PDF, contamos las páginas
            # num_pages = None
            # if file_type == "application/pdf":
            #     pdf_file = BytesIO(file.read())
            #     pdf = PdfReader(pdf_file)
            #     num_pages = len(pdf.pages)
            
            # Actualizamos la información del archivo en el comercio
            commerce.menu_url = file_url
            # commerce.menu_pages = num_pages
        elif file_url:
            # Eliminar el archivo de Cloudinary si existía
            if commerce.menu_url and (commerce.menu_url.startswith("http://res.cloudinary.com/") or commerce.menu_url.startswith("https://res.cloudinary.com/")):
                public_id = commerce.menu_url.split('/')[-1].split('.')[0]
                cloudinary.uploader.destroy(public_id, resource_type='auto')

            # Actualizar la URL del menú en el comercio
            commerce.menu_url = file_url
            commerce.menu_pages = None
        else:
            return Response({"error": "No se ha proporcionado ni un archivo ni un enlace."}, status=status.HTTP_400_BAD_REQUEST)

        commerce.save()

        response_data = {
            "menu_url": commerce.menu_url,
            "num_pages": commerce.menu_pages,
        }
        
        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)