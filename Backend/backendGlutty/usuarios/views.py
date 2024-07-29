from django.shortcuts import render, get_object_or_404
import datetime, jwt
from rest_framework import generics, status
from rest_framework.response import Response
from django.utils import timezone
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from .models import *
from .serializers import *
from comercios.models import *
from django.db import transaction


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
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

@api_view(["POST"])
@transaction.atomic
def register(request):
    """
    Metodo para registrar un usuario, con email y contraseña.
    """
    # Crear usuario y comercio o celíaco
    serializer = UsuarioSerializer(data=request.data)
        
    if serializer.is_valid():
        serializer.save()
        usuario_data = serializer.data
        usuario = User.objects.filter(username=usuario_data["username"]).first()
        Session.objects.create(user=usuario) # Crear una sesión para el nuevo usuario

        # Validar si es comercio o persona y en base a eso realizar el registro
        if usuario.is_commerce:
            commerce = Commerce.objects.create(user=usuario) # Crear un comercio para el nuevo usuario
            commerce.name = request.data["name"]
            commerce.cuit = request.data["cuit"]
            commerce.social_reason = request.data["social_reason"]
            commerce.description = request.data["description"]
            
            commerce.save()
        else:
            celiac = Celiac.objects.create(user=usuario)
            celiac.first_name = request.data["first_name"]
            celiac.last_name = request.data["last_name"]
            celiac.sex = request.data["sex"]
            celiac.date_birth = request.data["date_birth"]
            celiac.save()
        return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)
    #Si el serializaer.is_valid da error
    return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(["POST"])
# def login(request):
#     """
#     Permite iniciar sesión
#     """
#     username = request.data["username"]
#     password = request.data["password"]
#     usuario = Usuario.objects.filter(username=username).first()

#     if usuario is None:
#         raise AuthenticationFailed("Usuario no encontrado.")
    
#     sesion = Sesion.objects.get(user=usuario)

#     if not usuario.check_password(password):
#         sesion.increment_login_attempts()
#         if sesion.login_attempts >= 3:
#             raise AuthenticationFailed("Máximo número de intentos de inicio de sesión alcanzado.")
#         raise AuthenticationFailed("Contraseña incorrecta.")

#     if not usuario.is_active:
#         raise AuthenticationFailed("Cuenta eliminada.")
    
    
#     # Reiniciar los intentos de inicio de sesión y marcar la sesión como inicializada
#     sesion.initialize_session()

#     usuario.last_login = timezone.now()
#     usuario.save(update_fields=["last_login"])

#     # payload = {
#     #     'id': usuario.id,
#     #     'exp': datetime.utcnow() + datetime.timedelta(minutes=500),
#     #     'iat': datetime.utcnow(),
#     #     'is_superuser': usuario.is_superuser
#     # }

#     # token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')

#     # Convertir usuario a JSON
#     serializer = UsuarioSerializer(usuario)

#     response = {
#         "user": serializer.data,
#         # "data": {
#         #     'jwt': token
#         # }
#     }

#     return Response(response, status=status.HTTP_200_OK)

@api_view(["POST"])
def login(request):
    """
    Permite iniciar sesión
    """
    try:
        username = request.data["username"]
        password = request.data["password"]
    except KeyError:
        return Response({"error": "username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    usuario = User.objects.filter(username=username).first()

    if usuario is None:
        raise AuthenticationFailed("Usuario no encontrado.")
    
    sesion, created = Session.objects.get_or_create(user=usuario)

    if not usuario.check_password(password):
        sesion.login_attempts += 1
        sesion.save()
        if sesion.login_attempts >= 3:
            return Response({"error": "Máximo número de intentos de inicio de sesión alcanzado."}, status=status.HTTP_403_FORBIDDEN)
        return Response({"error": "Contraseña incorrecta."}, status=status.HTTP_401_UNAUTHORIZED)

    if not usuario.is_active:
        raise AuthenticationFailed("Cuenta eliminada.")
    
    # Reiniciar los intentos de inicio de sesión y marcar la sesión como inicializada
    sesion.session_initialized = True
    sesion.login_attempts = 0
    sesion.session_data = {'last_login': timezone.now().isoformat()}
    sesion.save()

    # Convertir usuario a JSON
    serializer = UsuarioSerializer(usuario)

    response = {
        "user": serializer.data,
    }

    return Response(response, status=status.HTTP_200_OK)

@api_view(["POST"])
def login(request):
    """
    Permite iniciar sesión
    """
    username = request.data["username"]
    password = request.data["password"]
    usuario = User.objects.filter(username=username).first()

    if usuario is None:
        raise AuthenticationFailed("Usuario no encontrado.")
    
    sesion = Session.objects.get(user=usuario)

    if not usuario.check_password(password):
        sesion.increment_login_attempts()
        if sesion.login_attempts >= 3:
            raise AuthenticationFailed("Máximo número de intentos de inicio de sesión alcanzado.")
        raise AuthenticationFailed("Contraseña incorrecta.")

    if not usuario.is_active:
        raise AuthenticationFailed("Cuenta eliminada.")
    
    
    # Reiniciar los intentos de inicio de sesión y marcar la sesión como inicializada
    sesion.initialize_session()

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

@api_view(["POST"])
def logout(request):
    """
    Permite cerrar sesión
    """
    try:
        username = request.data["username"]
    except KeyError:
        return Response({"error": "username is required."}, status=status.HTTP_400_BAD_REQUEST)

    usuario = User.objects.filter(username=username).first()

    if usuario is None:
        raise AuthenticationFailed("Usuario no encontrado.")

    sesion = Session.objects.filter(user=usuario).first()

    if sesion and sesion.session_initialized:
        sesion.session_initialized = False
        sesion.save()
        return Response({"message": "Sesión cerrada exitosamente."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "No hay ninguna sesión activa para cerrar."}, status=status.HTTP_400_BAD_REQUEST)



@api_view(["PUT"])
def update(request, user_id):
    user = get_object_or_404(User, id=user_id)

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
    usuario = User.objects.filter(username=username).first()

    if usuario.is_authenticated:
        usuario.is_active = False
        usuario.save()
        return Response("Se eliminó el usuario.")
    
    return Response("Usuario no encontrado.", status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def changePassword(request):
    """
    Permite cambiar la contraseña
    """
    username = request.data["username"]
    old_password = request.data["old_password"]
    new_password = request.data["new_password"]
    
    if not all([username, old_password, new_password]):
        return Response({
            'status': '400',
            'error': "Todos los campos son obligatorios",
            'data': []
        }, status=status.HTTP_400_BAD_REQUEST)
    
    usuario = User.objects.filter(username=username).first()
    
    if usuario is None:
        return Response({
            'status': '404',
            'error': "Usuario no encontrado",
            'data': []
        }, status=status.HTTP_404_NOT_FOUND)
    
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
        'data': [usuario.password]
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