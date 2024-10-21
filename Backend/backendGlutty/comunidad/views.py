import json
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
from django.shortcuts import get_object_or_404

# Función que crea el POST
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def create_post(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
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
            if images:
                post.UploadPictures(images)
            
            # Manejar etiquetas del posteo
            labels = request.data.getlist("labels")  # Array de etiquetas
            # labels = json.loads(request.data.get("labels", "[]"))

            labels = request.data.get("labels", "[]")  # Obtiene la cadena JSON
            try:
                labels = json.loads(labels)  # Convierte la cadena JSON en un array de Python
            except json.JSONDecodeError:
                labels = []  # En caso de error, asignar un array vacío
                
            print("Labels: ", labels)
            if labels:
                print(labels)
                for label_name in labels:
                    # Ignorar mayúsculas/minúsculas en la comparación
                    label, _ = Label.objects.get_or_create(name__iexact=label_name, defaults={'name': label_name})
                    # Crear la relación LabelxPost
                    LabelxPost.objects.create(post=post, label=label)
        
        return Response({"Detail": f"Post creado correctamente."}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_post_by_id(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    id = request.data.get("id")
    
    try:
        post = get_object_or_404(Post, id=id)
        
        #Obtener el nombre completo si es celiaco, o el nombre del comercio si es comercio
            
        user_liked = Like.objects.filter(user=user, post=post).exists()
        
        post_data = {
            "post_id": post.id,
            "user": post.user.username,
            "name": Post.get_name(post.user),
            "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
            "body": post.body,
            "created_at": post.created_at,
            "likes": post.likes_number,
            "user_liked": user_liked,  # Indica si el usuario actual ha dado like al post
            "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
            "comments_number": post.comments_number,
            "comments": [
                {
                    "comment_id": comment.id,
                    "user": comment.user.username,
                    "name": Post.get_name(comment.user),
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

        connection.close()
        return Response({"Detail": f"Like agregado. Total de likes: {post.likes_number}"}, status=status.HTTP_200_OK)
    
    except Exception as e:
        connection.close()
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
        print(comment)
        
        post.comments_number += 1
        post.save()
        
        if comment.user.profile_picture:
            profile_picture = comment.user.profile_picture
        else:
            profile_picture = None
            
        # Crear la respuesta con los detalles del comentario recién creado
        response_data = {
            "comment_id": comment.id,
            "user": comment.user.username,
            "name": Post.get_name(comment.user),
            "profile_picture": profile_picture,
            "content": comment.content,
            "created_at": comment.created_at,
        }
        
        connection.close()
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        connection.close()
        return Response({"error": f"Error al agregar comentario: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_favorite(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()

    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    id = request.data.get("id")

    try:
        post = get_object_or_404(Post, id=id)

        # Verificar si el post ya está en favoritos
        if Favorite.objects.filter(user=user, post=post).exists():
            return Response({"error": "Este post ya está en tus favoritos."}, status=status.HTTP_400_BAD_REQUEST)

        # Agregar el post a favoritos
        Favorite.objects.create(user=user, post=post)
        
        connection.close()
        return Response({"Detail": "Post agregado a favoritos."}, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al agregar a favoritos: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_favorites(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()

    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    try:
        # Obtener los posts favoritos del usuario
        favorites = Favorite.objects.filter(user=user).select_related('post')
        
        # Crear una lista de datos de los posts favoritos
        favorite_posts = []
        for favorite in favorites:
            post = favorite.post
            
            user_liked = Like.objects.filter(user=user, post=post).exists()
        
            user_faved = Favorite.objects.filter(user=user, post=post).exists()
            
            favorite_posts.append({
                "post_id": post.id,
                "id": post.id,
                "user": post.user.username,
                "name": Post.get_name(post.user),
                "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
                "body": post.body,
                "created_at": post.created_at,
                "likes": post.likes_number,
                "user_liked": user_liked,
                "user_faved": user_faved,
                "comments_number": post.comments_number,
                "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
                "labels": [label.label.name for label in post.labels.all()],
            })

        connection.close()
        return Response(favorite_posts, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al obtener favoritos: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_posts(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    try:
        # Obtener los posts del usuario autenticado
        my_posts = Post.objects.filter(user=user).select_related('user')

        # Crear una lista de datos de los posts
        posts_data = []
        for post in my_posts:
            user_liked = Like.objects.filter(user=user, post=post).exists()
            
            user_faved = Favorite.objects.filter(user=user, post=post).exists()

            posts_data.append({
                "post_id": post.id,
                "user": post.user.username,
                "name": Post.get_name(post.user),
                "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
                "body": post.body,
                "created_at": post.created_at,
                "likes": post.likes_number,
                "comments_number": post.comments_number,
                "user_liked": user_liked,
                "user_faved": user_faved,
                "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
                "labels": [label.label.name for label in post.labels.all()],
            })

        connection.close()
        return Response(posts_data, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al obtener mis posts: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Trae solo 30 posteos se puede modificar nsino
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_recent_posts(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    labels = request.data.get("labels")

    try:
        if labels:
            posts_data = filter_posts_by_labels(labels, user, '-created_at')

        else:
            # Obtener los posts más recientes de todos los usuarios, limitando la cantidad de resultados
            recent_posts = Post.objects.all().select_related('user')[:30]  # Cambia el 10 por el número de posts que deseas obtener

            # Crear una lista de datos de los posts
            posts_data = []
            for post in recent_posts:
                user_liked = Like.objects.filter(user=user, post=post).exists()
                user_faved = Favorite.objects.filter(user=user, post=post).exists()

                posts_data.append({
                    "post_id": post.id,
                    "user": post.user.username,
                    "name": Post.get_name(post.user),
                    "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
                    "body": post.body,
                    "created_at": post.created_at,
                    "likes": post.likes_number,
                    "comments_number": post.comments_number,
                    "user_liked": user_liked,
                    "user_faved": user_faved,
                    "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
                    "labels": [label.label.name for label in post.labels.all()],
                })

        connection.close()
        return Response(posts_data, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al obtener los posteos recientes: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_popular_posts(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    labels = request.data.get("labels")

    try:
        
        if labels:
            posts_data = filter_posts_by_labels(labels, user, '-likes_number')

        else:
            # Obtener los posts ordenados por la cantidad de likes
            popular_posts = Post.objects.all().order_by('-likes_number')[:30]  # Cambia el 30 por el número de posts que deseas obtener

            # Crear una lista de datos de los posts populares
            posts_data = []
            for post in popular_posts:
                user_liked = Like.objects.filter(user=user, post=post).exists()
                user_faved = Favorite.objects.filter(user=user, post=post).exists()

                posts_data.append({
                    "post_id": post.id,
                    "user": post.user.username,
                    "name": Post.get_name(post.user),
                    "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
                    "body": post.body,
                    "created_at": post.created_at,
                    "likes": post.likes_number,
                    "comments_number": post.comments_number,
                    "user_liked": user_liked,
                    "user_faved": user_faved,
                    "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
                    "labels": [label.label.name for label in post.labels.all()],
                })

        connection.close()
        return Response(posts_data, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al obtener los posteos populares: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def filter_posts_by_labels(labels, user, order_by):
    # Convierte el string separado por comas en una lista de enteros
    label_ids = [int(label_id) for label_id in labels.split(',') if label_id.isdigit()]
    
    posts = Post.objects.filter(labels__label__id__in=label_ids).distinct().order_by(order_by)[:30]  # Cambia el 30 por el número de posts a obtener

    posts_data = []
    for post in posts:
        user_liked = Like.objects.filter(user=user, post=post).exists()
        user_faved = Favorite.objects.filter(user=user, post=post).exists()

        posts_data.append({
            "post_id": post.id,
            "user": post.user.username,
            "name": Post.get_name(post.user),
            "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
            "body": post.body,
            "created_at": post.created_at,
            "likes": post.likes_number,
            "comments_number": post.comments_number,
            "user_liked": user_liked,
            "user_faved": user_faved,
            "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
            "labels": [label.label.name for label in post.labels.all()],
        })

    return posts_data



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def search_labels(request):
    search_term = request.data.get("q", None) # Obtener la consulta de búsqueda
    if not search_term:
        return Response({"labels": []}, status=status.HTTP_200_OK)

    # Filtrar etiquetas que contengan el término de búsqueda (case insensitive)
    matching_labels = Label.objects.filter(name__icontains=search_term)

    # Devolver los nombres de las etiquetas coincidentes
    labels_data = [{"id": label.id,
                    "name": label.name,
                    } for label in matching_labels]
    
    connection.close()
    return Response({"labels": labels_data}, status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@transaction.atomic
def delete_post(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()

    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    post_id = request.data.get("id")

    try:
        post = get_object_or_404(Post, id=post_id, user=request.user)

        # Obtener todas las etiquetas asociadas al post antes de eliminarlo
        labels = post.labels.all()  # Esto obtiene las relaciones LabelxPost asociadas al post
        
        # Almacenar las etiquetas en una lista para no perderlas cuando se borre el post
        label_ids = [labelxpost.label.id for labelxpost in labels]
        
        # Eliminar el post (esto eliminará automáticamente LabelxPost por on_delete=models.CASCADE)
        post.delete()

        # Revisar si alguna etiqueta quedó sin posts asociados
        for label_id in label_ids:
            label = Label.objects.get(id=label_id)
            # Verificar si esa etiqueta está asociada a otros posts
            if not LabelxPost.objects.filter(label=label).exists():
                # Si no está asociada a ningún otro post, se elimina la etiqueta
                label.delete()
        
        return Response({"Detail": "Post y contenido asociado eliminado correctamente."}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": f"Error al eliminar el post: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_comment(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    comment_id = request.data.get("id")
    
    if not comment_id:
        connection.close()
        return Response({"error": "Falta el ID del comentario."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        comment = get_object_or_404(Comment, id=comment_id, user=request.user)
        comment.delete()
        connection.close()
        return Response({"Detail": "Comentario eliminado correctamente."}, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al eliminar el comentario: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_like(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    id = request.data.get("id")
    try:
        post = get_object_or_404(Post, id=id)
        like = Like.objects.filter(user=user, post=post).first()
        if not like:
            connection.close()
            return Response({"error": "No has dado like a este post."}, status=status.HTTP_400_BAD_REQUEST)

        # Eliminar el like
        like.delete()
        
        # Reducir el número de likes en el post
        post.likes_number -= 1
        post.save()

        connection.close()
        return Response({"Detail": f"Like eliminado. Total de likes: {post.likes_number}"}, status=status.HTTP_200_OK)
    except Exception as e:
        connection.close()
        return Response({"error": f"Error al eliminar el like: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_favorite(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    id = request.data.get("id")
    try:
        post = get_object_or_404(Post, id=id)
        favorite = Favorite.objects.filter(user=user, post=post).first()
        if not favorite:
            connection.close()
            return Response({"error": "Este post no está en tus favoritos."}, status=status.HTTP_400_BAD_REQUEST)

        # Eliminar de favoritos
        favorite.delete()

        connection.close()
        return Response({"Detail": "Post eliminado de favoritos."}, status=status.HTTP_200_OK)
    except Exception as e:
        connection.close()
        return Response({"error": f"Error al eliminar de favoritos: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
