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
from comercios.models import Commerce, Branch
from .serializers import UsuarioSerializer, CeliacSerializer
from comercios.serializers import CommerceSerializer
from django.db import transaction
from .image import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import ValidationError
from comercios.views import get_commerce_info
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

# @csrf_exempt
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def cargar_foto(request):
#     try:
#         print("hasta acá sí llega")
#         picture_link = upload_to_cloudinary(request)
#         return Response({"url": picture_link}, status=status.HTTP_201_CREATED)
#     except Exception as e:
#         print("hay un error: " + str(e))
#         return Response({"error": "no se pudo cargar la foto."}, status=status.HTTP_400_BAD_REQUEST)

# @swagger_auto_schema(method='post', request_body=UsuarioSerializer, responses={200: UsuarioSerializer})
# @api_view(['POST'])
# @permission_classes([AllowAny])
# @transaction.atomic
# @permission_classes([AllowAny])
# def register(request):
#     """
#     Metodo para registrar un usuario, con email y contraseña.
#     """
#     # Crear usuario y comercio o celíaco
#     serializer = UsuarioSerializer(data=request.data)
        
#     if serializer.is_valid():
#         serializer.save()
#         usuario_data = serializer.data
#         usuario = User.objects.filter(username=usuario_data["username"]).first()
        
#         image = request.FILES.get('image')
#         if image:
#             picture_link = upload_to_cloudinary(image)
#             usuario.profile_picture = picture_link
#             usuario.save()
        
#         Session.objects.create(user=usuario) # Crear una sesión para el nuevo usuario
#         # Validar si es comercio o persona y en base a eso realizar el registro
#         if usuario.is_commerce:
#             commerce = Commerce.objects.create(user=usuario, 
#                                                 name=request.data.get("name"),
#                                                 cuit=request.data.get("cuit"),
#                                                 description=request.data.get("description"))
            
#             commerce.save()
            
#             # login_data = {
#             # "username": usuario.username,
#             # "password": request.data.get("password")
#             # }
#             # login_request = request._request
#             # login_request.POST = login_data
#             # login_response = login(login_request)
                   
#             return Response({"detail": "Usuario registrado correctamente."}, status=status.HTTP_201_CREATED)
#         else:
#             celiac = Celiac.objects.create(user=usuario,
#                                             first_name=request.data.get("first_name"),
#                                             last_name=request.data.get("last_name"),
#                                             sex=request.data.get("sex"),
#                                             date_birth=request.data.get("date_birth"))
#             celiac.save()
            
#             # login_data = {
#             # "username": usuario.username,
#             # "password": request.data.get("password")
#             # }
#             # login_request = request._request
#             # login_request.POST = login_data
#             # login_response = login(login_request)
                   
#             return Response({"detail": "Usuario registrado correctamente."}, status=status.HTTP_201_CREATED)
        
#     #Si el serializaer.is_valid da error
#     return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
@transaction.atomic
def register(request):
    """
    Método para registrar un usuario, con email y contraseña.
    """
    try:
        # Crear usuario y comercio o celíaco
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            # Guardar el usuario
            usuario = serializer.save()
            
            # Manejar la imagen de perfil si se proporciona
            image = request.FILES.get('image')
            print(str(image))
            
            if image:
                try:
                    picture_link, public_id = upload_to_cloudinary(image)
                    usuario.profile_picture = picture_link
                    usuario.save()
                except Exception as e:
                    raise ValidationError(f"Error al subir la imagen: {str(e)}")
            
            # Crear sesión para el nuevo usuario
            Session.objects.create(user=usuario)

            # Validar si es comercio o persona y en base a eso realizar el registro
            if usuario.is_commerce:
                try:
                    commerce = Commerce.objects.create(
                        user=usuario,
                        name=request.data.get("name"),
                        cuit=request.data.get("cuit"),
                        description=request.data.get("description")
                    )
                    commerce.save()
                except Exception as e:
                    raise ValidationError(f"Error al crear el comercio: {str(e)}")
            else:
                try:
                    celiac = Celiac.objects.create(
                        user=usuario,
                        first_name=request.data.get("first_name"),
                        last_name=request.data.get("last_name"),
                        sex=request.data.get("sex"),
                        date_birth=request.data.get("date_birth")
                    )
                    celiac.save()
                except Exception as e:
                    raise ValidationError(f"Error al crear el perfil de celíaco: {str(e)}")

            # Respuesta de éxito
            return Response({"detail": "Usuario registrado correctamente."}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        # Si el serializer.is_valid da error
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @swagger_auto_schema(method='post', request_body=UsuarioSerializer, responses={200: UsuarioSerializer})
@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    print("hola")
    """
    Permite iniciar sesión y generar token JWT
    """
    try:
        print("try")
        username = request.data["username"]
        password = request.data["password"]
    except KeyError:
        print("hay un error")
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
    
    # Generar tokens JWT con el user_id
    refresh = RefreshToken.for_user(usuario)
    refresh['username'] = usuario.username  # Añadir el user_id al token
    access_token = str(refresh.access_token)

    # Convertir usuario a JSON
    serializer = UsuarioSerializer(usuario)

    user_data = {"username": usuario.username, "id": usuario.id}

    if usuario.is_commerce:
        # Agregar datos específicos para comercio
        commerce = Commerce.objects.filter(user=usuario).first()
        if commerce:
            user_data["name"] = commerce.name
            
            # Obtener las sucursales (Branch) del comercio
            branches = Branch.objects.filter(commerce=commerce)
            branches_data = [{"id": branch.id, "name": branch.name, "address": branch.location.address} for branch in branches if branch.is_active]
            user_data["Branches"] = branches_data

    else:
        # Agregar datos específicos para celíaco
        celiac = Celiac.objects.filter(user=usuario).first()
        if celiac:
            user_data["first_name"] = celiac.first_name
    
    response_data = {}
    response_data["user"] = user_data
    response_data["profile_picture"] = str(usuario.profile_picture)
    response_data["is_commerce"] = usuario.is_commerce
    response_data["access_token"] = access_token
    response_data["refresh_token"] = str(refresh)

    return Response(response_data, status=status.HTTP_200_OK)

# @swagger_auto_schema(method='post', request_body=UsuarioSerializer, responses={200: "Sesión cerrada exitosamente."})
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Permite cerrar sesión solo para el usuario autenticado con el token proporcionado.
    """
    try:
        # Obtener el token JWT desde la solicitud
        jwt_authenticator = JWTAuthentication()
        user_jwt, token = jwt_authenticator.authenticate(request)

        if not user_jwt or not token:
            return Response({"error": "Token inválido o no se encontró token."}, status=status.HTTP_403_FORBIDDEN)

        # Verificar que el token JWT pertenece al usuario que realiza la solicitud
        if token['username'] != request.user.username:
            print(token['username'])
            print(request.user)
            return Response({"error": "No autorizado para esta acción."}, status=status.HTTP_403_FORBIDDEN)

        # Obtener la sesión del usuario autenticado
        sesion = Session.objects.filter(user=request.user).first()

        if sesion and sesion.session_initialized:
            sesion.session_initialized = False
            sesion.save()
            return Response({"message": "Sesión cerrada exitosamente."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No hay ninguna sesión activa para cerrar."}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": f"Error al procesar la solicitud: {str(e)}"}, status=status.HTTP_403_FORBIDDEN)


# @swagger_auto_schema(method='put', request_body=UsuarioSerializer, responses={200: UsuarioSerializer})
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def update(request, user_id):
    if request.user.id != user_id:
        return Response({"error": "No autorizado para esta acción."}, status=status.HTTP_403_FORBIDDEN)
    
    user = get_object_or_404(User, id=user_id)
    old_username = user.username

    # Actualizar datos del usuario
    user_serializer = UsuarioSerializer(user, data=request.data, partial=True)
    print("holaaaaaaaaaaaa")
    print(user_serializer)

    if user_serializer.is_valid():
        user_serializer.save()
        # Si el nombre de usuario ha cambiado, generamos un nuevo token
        if user.username != old_username:
            refresh = RefreshToken.for_user(user)
            refresh['username'] = user.username  # Asegúrate de que el username en el token esté actualizado
            tokens = {
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }
        else:
            tokens = None
            # {
            #     "refresh": str(request.auth),
            #     "access": str(token)
            # }
        
        
        # Procesar imagen si está presente
        image = request.FILES.get('image')
        if image:
            print("entra a if image")
            picture_link, link = upload_to_cloudinary(image)
            user.profile_picture = picture_link
            user.save()
        
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

        # Responder con los datos del usuario y los tokens si es necesario
        response_data = {"user": user_serializer.data}
        if tokens:
            response_data["tokens"] = tokens
        return Response(response_data, status=status.HTTP_200_OK)

    return Response({"error": user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# @swagger_auto_schema(method='delete', request_body=UsuarioSerializer, responses={200: "Se eliminó el usuario."})
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete(request):
    username = request.data["username"]
    user = User.objects.filter(username=username).first()
    
    if not user or request.user.username != username:
        return Response({"error": "No autorizado para esta acción."}, status=status.HTTP_403_FORBIDDEN)

    if user.is_authenticated:
        user.is_active = False
        user.save()
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
        
    if request.user.username != username:
        return Response({"error": "No autorizado para esta acción."}, status=status.HTTP_403_FORBIDDEN)
    
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

@api_view(["GET"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def get_user(request):
    username = request.user.username
    #user = request.user
    user = User.objects.filter(username=username).first()
    
    # if not user or request.user.username != username:
    #     print(request.user.username)
    #     print(username)
    #     return Response({"error": "No autorizado para esta acción."}, status=status.HTTP_403_FORBIDDEN)

    user_data = {
        "username": user.username,
        "email": user.email,
        "profile_picture": user.profile_picture,
    }
    
    if user.is_commerce:
        # Llamar a la función de commerce para obtener la información
        commerce_data, branch_data = get_commerce_info(user)
        
        return Response({
            "user_data": user_data,
            "commerce_data": commerce_data,
            "branch_data": branch_data
        }, status=status.HTTP_200_OK)
    else:
        # Obtenemos los datos del celíaco
        celiac = get_object_or_404(Celiac, user=user)
        celiac_data = {
            "first_name": celiac.first_name,
            "last_name": celiac.last_name,
            "sex": celiac.sex,
            "date_birth": celiac.date_birth,
        }
        
        return Response({
            "user_data": user_data,
            "celiac_data": celiac_data
        }, status=status.HTTP_200_OK)
    
    # ESTO NO ESTÁ BIEN
    # if request.user.id != user.id:
    #     return Response({"error": "No autorizado para esta acción."}, status=status.HTTP_403_FORBIDDEN)