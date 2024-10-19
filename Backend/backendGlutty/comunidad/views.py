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
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_post_by_id(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    id = request.data.get("id")
    
    try:
        post = get_object_or_404(Post, id=id)
        
        #Obtener el nombre completo si es celiaco, o el nombre del comercio si es comercio
        def get_name(user):
            if hasattr(user, 'celiac'):
                return f"{user.celiac.first_name} {user.celiac.last_name}"
            elif hasattr(user, 'commerce'):
                return user.commerce.name
            else:
                return user.username
            
        user_liked = Like.objects.filter(user=user, post=post).exists()
        
        post_data = {
            "user": post.user.username,
            "name": get_name(post.user),
            "body": post.body,
            "created_at": post.created_at,
            "likes": post.likes_number,
            "user_liked": user_liked,  # Indica si el usuario actual ha dado like al post
            "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
            "comments": [
                {
                    "user": comment.user.username,
                    "name": get_name(comment.user),
                    "profile_picture": comment.user.profile_picture if comment.user.profile_picture else None,
                    "content": comment.content,
                    "created_at": comment.created_at
                }
                for comment in post.comments.all()
            ],
            "labels": [label.label.name for label in post.labels.all()],
        }
        return Response(post_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": f"Error al obtener el post: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_like(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    id = request.data.get("id")
    
    try:
        post = get_object_or_404(Post, id=id)

        # Verificar si el usuario ya ha dado like al post
        if Like.objects.filter(user=user, post=post).exists():
            return Response({"error": "Ya has dado like a este post."}, status=status.HTTP_400_BAD_REQUEST)

        # Agregar el like
        Like.objects.create(user=user, post=post)

        # Incrementar el número total de likes en el post
        post.likes_number += 1
        post.save()

        return Response({"Detail": f"Like agregado. Total de likes: {post.likes_number}"}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error al agregar like: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_comment(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    id = request.data.get("id")
    
    try:
        post = get_object_or_404(Post, id=id)
        content = request.data.get("comment")
        
        if not content:
            return Response({"error": "El comentario no puede estar vacío."}, status=status.HTTP_400_BAD_REQUEST)

        comment = Comment.objects.create(user=request.user, post=post, content=content)
        return Response({"Detail": f"Comentario agregado correctamente."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": f"Error al agregar comentario: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

