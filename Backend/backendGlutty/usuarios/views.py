from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.conf import settings
# from drf_yasg.utils import swagger_auto_schema
from .models import User, Session, Celiac
from comercios.models import Commerce
from .serializers import UsuarioSerializer, CeliacSerializer
from comercios.serializers import CommerceSerializer
from django.db import transaction
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
# from drf_yasg.utils import swagger_auto_schema


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

# @swagger_auto_schema(method='post', request_body=UsuarioSerializer, responses={200: UsuarioSerializer})
@api_view(['POST'])
@permission_classes([AllowAny])
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
            commerce = Commerce.objects.create(user=usuario, 
                                                name=request.data.get("name"),
                                                cuit=request.data.get("cuit"),
                                                social_reason=request.data.get("social_reason"),
                                                description=request.data.get("description"))
            
            commerce.save()
            return Response({"user": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            celiac = Celiac.objects.create(user=usuario,
                                            first_name=request.data.get("first_name"),
                                            last_name=request.data.get("last_name"),
                                            sex=request.data.get("sex"),
                                            date_birth=request.data.get("date_birth"))
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

# @swagger_auto_schema(method='post', request_body=UsuarioSerializer, responses={200: UsuarioSerializer})
@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    print("hola")
    """
    Permite iniciar sesión y generar token JWT
    """
    try:
        username = request.data["username"]
        password = request.data["password"]
        print("usuario: " + username)
    except KeyError:
        print("hay un error")
        return Response({"error": "username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    usuario = User.objects.filter(username=username).first()
    print(str(usuario.username))

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
    
    # Generar tokens JWT
    refresh = RefreshToken.for_user(usuario)
    access_token = str(refresh.access_token)

    # Convertir usuario a JSON
    serializer = UsuarioSerializer(usuario)

    response = {
        "user": serializer.data,
        "access_token": access_token,
        "refresh_token": str(refresh)
    }

    return Response(response, status=status.HTTP_200_OK)

# @api_view(["POST"])
# def login(request):
#     """
#     Permite iniciar sesión
#     """
#     username = request.data["username"]
#     password = request.data["password"]
#     usuario = User.objects.filter(username=username).first()

#     if usuario is None:
#         raise AuthenticationFailed("Usuario no encontrado.")
    
#     sesion = Session.objects.get(user=usuario)

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

# @swagger_auto_schema(method='post', request_body=UsuarioSerializer, responses={200: "Sesión cerrada exitosamente."})
@api_view(["POST"])
@permission_classes([IsAuthenticated])
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



# @swagger_auto_schema(method='put', request_body=UsuarioSerializer, responses={200: UsuarioSerializer})
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def update(request, user_id):
    user = get_object_or_404(User, id=user_id)

    # Actualizar datos del usuario
    user_serializer = UsuarioSerializer(user, data=request.data, partial=True)

    if user_serializer.is_valid():
        user_serializer.save()

        # Actualizar datos de Celiac o Commerce
        if user.is_commerce:
            commerce = get_object_or_404(Commerce, user=user)
            commerce_serializer = CommerceSerializer(commerce, data=request.data, partial=True)
            if commerce_serializer.is_valid():
                commerce_serializer.save()
            else:
                return Response({"error": commerce_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            celiac = get_object_or_404(Celiac, user=user)
            celiac_serializer = CeliacSerializer(celiac, data=request.data, partial=True)
            if celiac_serializer.is_valid():
                celiac_serializer.save()
            else:
                return Response({"error": celiac_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"user": user_serializer.data}, status=status.HTTP_200_OK)

    return Response({"error": user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# @swagger_auto_schema(method='delete', request_body=UsuarioSerializer, responses={200: "Se eliminó el usuario."})
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
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


# @swagger_auto_schema(method='post', request_body=UsuarioSerializer, responses={200: "Contraseña cambiada exitosamente."})
@api_view(['POST'])
@permission_classes([IsAuthenticated])
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