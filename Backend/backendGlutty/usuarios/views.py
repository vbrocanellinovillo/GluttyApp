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
from django.core.mail import send_mail
import re

# Create your views here.
class UsuarioAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def send_verification_code(request):
    username = request.data.get('username')
    if not username:
        return Response({"error": "username es requerido."}, status=status.HTTP_400_BAD_REQUEST)
    
    user = get_object_or_404(User, username=username)
    verification_code = user.generate_verification_code()
    
    if user.is_commerce:
        commerce = get_object_or_404(Commerce, user=user)
        greeting_name = commerce.getName()
    else:
        celiac = get_object_or_404(Celiac, user=user)
        greeting_name = celiac.getFirstName()  # Nombre de la persona.

    message = f"""
    ¡Hola {greeting_name}! ¡Gracias por elegir Glutty!

    Tu código de verificación es: {verification_code}. Ingrésalo en la app para poder activar tu cuenta.

    Te agradecemos nuevamente,
    Equipo Glutty.
    """
    
    send_mail(
        'Tu código de verificación Glutty',
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )
    
    return Response({"message": "Código de verificación enviado."}, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([AllowAny])
def verify_code(request):
    code = request.data.get('code')
    username = request.data.get('username')
    
    user = get_object_or_404(User, username=username)
    
    if user.verification_code == code and timezone.now() < user.verification_code_expires:
        user.is_verified = True
        user.verification_code = None
        user.verification_code_expires = None
        user.save()
        return Response({"message": "Verification successful."}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid or expired verification code."}, status=status.HTTP_400_BAD_REQUEST)

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
                    celiac_serializer = CeliacSerializer(data=request.data)
                    if celiac_serializer.is_valid():
                        # Guardar el usuario
                        celiac_serializer.save(user=usuario)
                    else:
                        print(celiac_serializer.errors)
                        # Si hay errores, lanzar excepción para que la transacción se revierta
                        raise ValidationError(celiac_serializer.errors)
                        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    raise ValidationError(f"Error al crear el perfil de celíaco: {str(e)}")

            # Respuesta de éxito
            return Response({"detail": "Usuario registrado correctamente."}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        # Si el serializer.is_valid da error
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    except ValidationError as e:
        # Si ocurre un error de validación, revertimos todo el proceso
        if usuario:  # Solo cerramos la conexión si el usuario fue creado
            usuario.delete()  # Eliminamos el usuario si hubo un error en el celíaco
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
    
    if not usuario.is_verified:
        raise AuthenticationFailed("Cuenta no verificada.", 403)
    
    # Reiniciar los intentos de inicio de sesión y marcar la sesión como inicializada
    sesion.session_initialized = True
    sesion.login_attempts = 0
    sesion.session_data = {'last_login': timezone.now().isoformat()}
    sesion.save()
    
    # Limpiar el historial de chat al iniciar sesión
    request.session['chat_history'] = []
    
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
            
            # Limpiar el chat history del usuario
            request.session['chat_history'] = []
            
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
            
            # Eliminar la imagen actual de cloudinary
            public_id = extract_public_id(user.profile_picture)
            print(public_id)
            if public_id:
                cloudinary.api.delete_resources(public_id, resource_type="image", type="upload")
            
            # Subir la nueva imagen a cloudinary
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

# Extraer el public_id para las fotos cargadas en cloudinary
def extract_public_id(url):
    # Este patrón extrae el public_id desde una URL de Cloudinary
    match = re.search(r'/upload/v\d+/(.+)\.\w+', url)
    if match:
        return match.group(1)
    return None

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