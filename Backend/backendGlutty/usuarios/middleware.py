import jwt
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from django.utils.deprecation import MiddlewareMixin

User = get_user_model()

class JWTUserMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Obtener el token de las cabeceras de autorización
        auth_header = request.META.get('HTTP_AUTHORIZATION', None)
        if auth_header:
            try:
                token = auth_header.split(' ')[1]  # Suponiendo que el formato es "Bearer <token>"
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                user_id = payload.get('user_id')
                request.user = User.objects.get(id=user_id) if user_id else AnonymousUser()
            except jwt.ExpiredSignatureError:
                request.user = AnonymousUser()
            except jwt.InvalidTokenError:
                request.user = AnonymousUser()
            except User.DoesNotExist:
                request.user = AnonymousUser()
        else:
            request.user = AnonymousUser()
