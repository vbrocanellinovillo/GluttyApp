from requests import Response
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from usuarios.models import User
from .serializers import *
from django.db import transaction
from django.db import connection

# Función que crea el POST
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def create_post(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    try:
        post_content = request.data.get("content")
        if post_content:
        # Crear nuevo posteo
            post = Post.objects.create(
                        user=user,
                        body=post_content
                    )
            post.save()

            # Manejar imágenes del posteo
            images = request.FILES.getlist("images")
            post.UploadPictures(images)
            
            # Manejar etiquetas del posteo
            labels = request.data.get("labels", [])  # Array de etiquetas
            if labels:
                for label_name in labels:
                    # Ignorar mayúsculas/minúsculas en la comparación
                    label, _ = Label.objects.get_or_create(name__iexact=label_name, defaults={'name': label_name})
                    # Crear la relación LabelxPost
                    LabelxPost.objects.create(post=post, label=label)
        
        return Response({"Detail": f"Post creado correctamente."}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)