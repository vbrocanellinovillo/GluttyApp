from django.shortcuts import render
import datetime, jwt
from rest_framework import generics, status
from rest_framework.response import Response
from django.utils import timezone
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from .models import *
from .serializers import UsuarioSerializer


# def apiOverView(request):
#     """
#     Muestra la vista principal de la api, con todos sus endpoints.
#     """
#     api_urls = {
#         'Lista de usuarios':'/lista-usuarios/',
#         'Registrar usuario':'/registrar/',
#         'Editar usuario':'/editar/',
#         'Eliminar usuario':'/eliminar/',
#         'Iniciar sesion:': '/login/',
#         'Cerrar sesion': '/logout/',
#         'Usuario en sesion':'/usuario/',
#     }

# Create your views here.
class UsuarioAPIView(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
@api_view(['POST']) 
def register(request):
    """
    Metodo para registrar un usuario, con email y contraseña.
    """
    serializer = UsuarioSerializer(data=request.data)
    #serializer.is_valid(raise_exception=True)

    if serializer.is_valid():
        serializer.save()
        usuario_data = serializer.data
        usuario = Usuario.objects.filter(username=usuario_data['username']).first()
        payload = {
            'id': usuario.id,
            'exp' : datetime.now(datetime.UTC) + datetime.timedelta(days=30),
            'iat': datetime.now(datetime.UTC)
        }
         
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')
        
        response = {
            "status": status.HTTP_200_OK,
            "error": None,
            "data": {
                **serializer.data,
                "token": token
            }
        }
    else:
        response = {
            "status": status.HTTP_400_BAD_REQUEST,
            "error": serializer.errors,
            "data": []
        }
    return Response(response)


@api_view(['POST'])
def login(request):
    """
    Permite iniciar sesión
    """
    username = request.data['username']
    password = request.data['password']
    usuario = Usuario.objects.filter(username=username).first()
    
    if usuario is None:
        raise AuthenticationFailed('Usuario no encontrado.')

    if not usuario.check_password(password):
        raise AuthenticationFailed('Contraseña incorrecta.')
    
    usuario.last_login = timezone.now()
    usuario.save(update_fields=['last_login'])

    payload = {
        'id': usuario.id,
        'exp': datetime.utcnow() + datetime.timedelta(minutes=500),
        'iat': datetime.utcnow(),
        'is_superuser': usuario.is_superuser
    }
    
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')

    response = {
        "status": status.HTTP_200_OK,
        "error": None,
        "data": {
            'jwt': token
        }
    }
    
    return Response(response)