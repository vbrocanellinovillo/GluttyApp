from django.shortcuts import render, get_object_or_404
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


@api_view(["POST"])
def register(request):
    """
    Metodo para registrar un usuario, con email y contraseña.
    """
    serializer = UsuarioSerializer(data=request.data)
    # serializer.is_valid(raise_exception=True)

    if serializer.is_valid():
        serializer.save()
        usuario_data = serializer.data
        usuario = Usuario.objects.filter(username=usuario_data["username"]).first()
        print("fecha: " + str(usuario.dateBirth))
        # payload = {
        #     'id': usuario.id,
        #     'exp' : datetime.now(datetime.UTC) + datetime.timedelta(days=30),
        #     'iat': datetime.now(datetime.UTC)
        # }

        # token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')

        return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)

    return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    """
    Permite iniciar sesión
    """
    username = request.data["username"]
    password = request.data["password"]
    usuario = Usuario.objects.filter(username=username).first()

    if usuario is None:
        raise AuthenticationFailed("Usuario no encontrado.")

    if not usuario.check_password(password):
        raise AuthenticationFailed("Contraseña incorrecta.")

    if not usuario.is_active:
        print(usuario.is_active)
        raise AuthenticationFailed("Cuenta eliminada.")

    usuario.last_login = timezone.now()
    usuario.save(update_fields=["last_login"])

    # payload = {
    #     'id': usuario.id,
    #     'exp': datetime.utcnow() + datetime.timedelta(minutes=500),
    #     'iat': datetime.utcnow(),
    #     'is_superuser': usuario.is_superuser
    # }

    # token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')

    # Convertir usuario a JSON
    serializer = UsuarioSerializer(usuario)

    response = {
        "user": serializer.data,
        # "data": {
        #     'jwt': token
        # }
    }

    return Response(response, status=status.HTTP_200_OK)


@api_view(["PUT"])
def update(request, user_id):
    user = get_object_or_404(Usuario, id=user_id)

    serializer = UsuarioSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)

    return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete(request):
    # user = get_object_or_404(Usuario, id=user_id)
    # user.delete()

    username = request.data["username"]
    usuario = Usuario.objects.filter(username=username).first()

    if usuario.is_authenticated:
        usuario.is_active = False
        usuario.save()
        print(usuario)
        return Response("Se eliminó el usuario.")


@api_view(['POST'])
def changePassword(request, id, old_password, new_password):
    """
    Permite cambiar la contraseña
    """
    username = request.data["username"]
    usuario = Usuario.objects.filter(username=username).first()
    if not usuario.check_password(old_password):
            return Response({
                        'status': '400',
                        'error': "La contraseña antigua no es correcta",
                        'data': []
                    }, status=status.HTTP_400_BAD_REQUEST)
    usuario.set_password(new_password)
    usuario.save()
    return Response({
        'status': '200',
        'error': '',
        'data': []
    }, status=status.HTTP_200_OK)
    
    # try:
    #     token = request.headers['Authorization']
    #     payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    #     idUsuario = payload['id']
    #     usuario = Usuario.objects.filter(id=idUsuario).first()
    #     token_contraseñas = request.data['passwords']
    #     #passwords = jwt.decode(token_contraseñas, 'encriptadofront', algorithms=['HS256'])
    #     pass_ant = token_contraseñas["pass_antigua"]
    #     pass_nueva = token_contraseñas['pass_nueva']
    #     if not usuario.check_password(pass_ant):
    #         return Response({
    #                     'status': '400',
    #                     'error': "La contraseña antigua no es correcta",
    #                     'data': []
    #                 }, status=status.HTTP_400_BAD_REQUEST)
    #     usuario.set_password(pass_nueva)
    #     usuario.save()
    #     return Response({
    #         'status': '200',
    #         'error': '',
    #         'data': []
    #     }, status=status.HTTP_200_OK)
    # except Exception as e:
    #     return Response({
    #                     'status': '400',
    #                     'error': e.args,
    #                     'data': []
    #                 }, status=status.HTTP_400_BAD_REQUEST)