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
from django.core.paginator import Paginator
from spanlp.palabrota import Palabrota
import re
from spanlp.domain.strategies import RemovePunctuation, RemoveNumbers, Preprocessing, JaccardIndex, CosineSimilarity, TextToLower, RemoveUnicodeCharacters, NumbersToVowelsInLowerCase, NumbersToConsonantsInLowerCase, RemoveTicks, RemoveUrls, RemoveAccents, RemoveEmoticons
from datetime import datetime, timedelta

palabrota = Palabrota(
    exclude=["huevo", "huevos", "hoyo", "negro", "negra", "gallina", "guiso", "tirar", 
             "pinche", "bolsa", "calabaza", "animal", "basura", "pisa", "cono", "pato", 
             "arepa", "come", "calienta", "cuchara"]
)
# Función que verifica si hay palabras inapropiadas en el contenido
def detect_inappropriate_words(content):
    content = re.sub(r'\d+', '', content)
    content = re.sub(r'[^\w\s]', '', content)
    print(content)
    replacements = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
    }

    # Función lambda que usa el diccionario de reemplazos
    content = re.sub(r'[áéíóúÁÉÍÓÚ]', lambda match: replacements[match.group(0)], content)
    exclude = ["minimo", "huevo", "huevos", "hoyo", "negro", "negra", "gallina", "guiso", "tirar", 
           "pinche", "bolsa", "calabaza", "animal", "basura", "pisa", "cono", "pato", 
           "arepa", "come", "calienta", "cuchara", "azúcar", "banana", "bananas", "almendra", "almendras", "cucharada", "cucharadita", "para", "asegurate", "canela", "engrasar", "la", "lo", "el", "ella", "eso", 
           "esa", "preparar", "preparacion", "preparando", "machacar", "machaca", "agrega", "engrasala", "con", "cocinar", "cocina", "pequeño", "pequeños", "lado", "lados", "arce", "acompañar", "acompaña", "acompañados", "acompañado", "verano", "calor"]

# Dividir el texto en palabras, filtrar las palabras excluidas, y volver a unir el texto
    content = ' '.join([word for word in content.split() if word.lower() not in exclude])
    print("content")
    print(content)
    print(content)
    return palabrota.contains_palabrota(content.lower())

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
        
        # Verificar si el contenido contiene palabras inapropiadas
        if post_content and detect_inappropriate_words(post_content):
            print()
            return Response(
                {"error": "Tu publicación no cumple con las normas de la comunidad por lo que no será publicada.\nGlutty te recuerda que fomentamos un espacio positivo, sano y respetuoso."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
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
             for label in labels:
                 print(label)
                 if label and detect_inappropriate_words(label):
                    return Response(
                        {"error": "Las labels contienen palabras inapropiadas y no se puede publicar."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
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


def format_time(timestamp):
    """
    Formatea un timestamp y devuelve un tiempo relativo ('hace X minutos', etc.)
    o una fecha formateada. Soporta tanto strings ISO 8601 como objetos datetime.
    """
    # Si el timestamp ya es un objeto datetime, no necesita conversión
    if isinstance(timestamp, datetime):
        date_time = timestamp
    elif isinstance(timestamp, str):
        # Si es un string, convertirlo a datetime
        try:
            date_time = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
        except ValueError as e:
            raise ValueError(f"El timestamp '{timestamp}' no es válido. Error: {e}")
    else:
        raise ValueError("El timestamp debe ser un string ISO 8601 o un objeto datetime.")

    # Obtener el tiempo actual con la misma zona horaria
    now = datetime.now(date_time.tzinfo)

    # Calcular la diferencia entre el tiempo actual y el timestamp
    delta = now - date_time

    # Formatear el tiempo en un string relativo
    if delta < timedelta(minutes=1):
        seconds = int(delta.total_seconds())
        return f"Hace {seconds} segundos"
    elif delta < timedelta(hours=1):
        if (delta.total_seconds() // 60) == 1:
            return f"Hace 1 minuto"
        else:    
            minutes = int(delta.total_seconds() // 60)
            return f"Hace {minutes} minutos"
    elif delta < timedelta(days=1):
        if (delta.total_seconds() // 3600) == 1:
            return f"Hace 1 hora"
        else:
            hours = int(delta.total_seconds() // 3600)
            return f"Hace {hours} horas"
    elif delta < timedelta(days=2):
        return "Hace 1 día"
    elif delta < timedelta(days=3):
        return "Hace 2 días"
    elif delta < timedelta(days=4):
        return "Hace 3 días"
    else:
        return date_time.strftime("%H:%M - %d/%m/%Y")


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
        user_faved = Favorite.objects.filter(user=user, post=post).exists()
        
        post_data = {
            "post_id": post.id,
            "user": post.user.username,
            "name": Post.get_name(post.user),
            "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
            "body": post.body,
            "created_at": format_time(post.created_at),
            "likes": post.likes_number,
            "user_liked": user_liked,  # Indica si el usuario actual ha dado like al post
            "user_faved": user_faved,
            "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
            "comments_number": post.comments_number,
            "comments": [
                {
                    "comment_id": comment.id,
                    "user": comment.user.username,
                    "name": Post.get_name(comment.user),
                    "profile_picture": comment.user.profile_picture if comment.user.profile_picture else None,
                    "content": comment.content,
                    "created_at": format_time(comment.created_at)
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
def toggle_like(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    post_id = request.data.get("id")
    
    try:
        post = get_object_or_404(Post, id=post_id)
        like = Like.objects.filter(user=user, post=post).first()
        
        if like:
            # Si el post ya está "likeado", eliminar el like
            like.delete()
            post.likes_number -= 1
            user_liked = False
        else:
            # Si no está "likeado", agregar el like
            Like.objects.create(user=user, post=post)
            post.likes_number += 1
            user_liked = True
        
        post.save()

        response_data = {
            "likes_number": post.likes_number,
            "user_liked": user_liked
        }

        connection.close()
        return Response(response_data, status=status.HTTP_200_OK)
    
    except Exception as e:
        connection.close()
        return Response({"error": f"Error al procesar el like: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        
         # Verificar si el contenido contiene palabras inapropiadas
        if content and detect_inappropriate_words(content):
            return Response(
                {"error": "Tu comentario no cumple con las normas de la comunidad por lo que no será publicado.\nGlutty te recuerda que fomentamos un espacio positivo, sano y respetuoso."},
                status=status.HTTP_400_BAD_REQUEST
            )

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
            "created_at": format_time(comment.created_at),
        }
        
        connection.close()
        return Response(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        connection.close()
        return Response({"error": f"Error al agregar comentario: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_favorite(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()

    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    post_id = request.data.get("id")

    try:
        post = get_object_or_404(Post, id=post_id)
        favorite = Favorite.objects.filter(user=user, post=post).first()
        
        if favorite:
            # Si el post ya está en favoritos, eliminarlo
            favorite.delete()
            user_faved = False
        else:
            # Si no está en favoritos, agregarlo
            Favorite.objects.create(user=user, post=post)
            user_faved = True

        response_data = {
            "user_faved": user_faved
        }

        connection.close()
        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al procesar favorito: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_favorites(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()

    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    try:
        # Parámetros de paginación
        page_number = request.query_params.get("page", 1)
        page_size = request.query_params.get("page_size", 10)

        # Obtener los posts favoritos del usuario
        favorites = Favorite.objects.filter(user=user).select_related('post')

        paginator = Paginator(favorites, page_size)
        paginated_favorites = paginator.get_page(page_number)
        
        # Crear una lista de datos de los posts favoritos
        favorite_posts = []
        for favorite in paginated_favorites:
            post = favorite.post
            
            user_liked = Like.objects.filter(user=user, post=post).exists()
            user_faved = Favorite.objects.filter(user=user, post=post).exists()
            
            favorite_posts.append({
                "post_id": post.id,
                "user": post.user.username,
                "name": Post.get_name(post.user),
                "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
                "body": post.body,
                "created_at": format_time(post.created_at),
                "likes": post.likes_number,
                "user_liked": user_liked,
                "user_faved": user_faved,
                "comments_number": post.comments_number,
                "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
                "labels": [label.label.name for label in post.labels.all()],
            })

        connection.close()
        return Response({
            "total_count": paginator.count,
            "total_pages": paginator.num_pages,
            "current_page": paginated_favorites.number,
            "posts": favorite_posts
        }, status=status.HTTP_200_OK)

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
        # Parámetros de paginación
        page_number = request.query_params.get("page", 1)
        page_size = request.query_params.get("page_size", 10)

        # Obtener los posts del usuario autenticado
        my_posts = Post.objects.filter(user=user).select_related('user')

        paginator = Paginator(my_posts, page_size)
        paginated_posts = paginator.get_page(page_number)

        posts_data = []
        for post in paginated_posts:
            user_liked = Like.objects.filter(user=user, post=post).exists()
            user_faved = Favorite.objects.filter(user=user, post=post).exists()

            posts_data.append({
                "post_id": post.id,
                "user": post.user.username,
                "name": Post.get_name(post.user),
                "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
                "body": post.body,
                "created_at": format_time(post.created_at),
                "likes": post.likes_number,
                "comments_number": post.comments_number,
                "user_liked": user_liked,
                "user_faved": user_faved,
                "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
                "labels": [label.label.name for label in post.labels.all()],
            })

        connection.close()
        return Response({
            "total_count": paginator.count,
            "total_pages": paginator.num_pages,
            "current_page": paginated_posts.number,
            "posts": posts_data,
        }, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al obtener mis posts: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Traer los post recientes con paginado
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_recent_posts(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    labels = request.data.get("labels")
    page = request.data.get("page", 1)
    page_size = request.data.get("page_size", 10)

    try:
        if labels:
            posts_queryset = filter_posts_by_labels(labels, user, '-created_at')
        else:
            # Obtener los posts más recientes de todos los usuarios
            posts_queryset = Post.objects.all().select_related('user').order_by('-created_at')

        # Paginación
        paginator = Paginator(posts_queryset, page_size)
        paginated_posts = paginator.get_page(page)

        # Crear una lista de datos de los posts
        posts_data = []
        for post in paginated_posts:
            user_liked = Like.objects.filter(user=user, post=post).exists()
            user_faved = Favorite.objects.filter(user=user, post=post).exists()

            posts_data.append({
                "post_id": post.id,
                "user": post.user.username,
                "name": Post.get_name(post.user),
                "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
                "body": post.body,
                "created_at": format_time(post.created_at),
                "likes": post.likes_number,
                "comments_number": post.comments_number,
                "user_liked": user_liked,
                "user_faved": user_faved,
                "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
                "labels": [label.label.name for label in post.labels.all()],
            })
            
        connection.close()
        return Response({
            "total_count": paginator.count,
            "total_pages": paginator.num_pages,
            "current_page": paginated_posts.number,
            "posts": posts_data,
        }, status=status.HTTP_200_OK)

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
    page = request.data.get("page", 1)
    page_size = request.data.get("page_size", 10)

    try:
        if labels:
            posts_queryset = filter_posts_by_labels(labels, user, '-likes_number')
        else:
            # Obtener los posts más recientes de todos los usuarios
            posts_queryset = Post.objects.all().select_related('user').order_by('-likes_number', '-id')

        # Paginación
        paginator = Paginator(posts_queryset, page_size)
        paginated_posts = paginator.get_page(page)

        # Crear una lista de datos de los posts
        posts_data = []
        for post in paginated_posts:
            user_liked = Like.objects.filter(user=user, post=post).exists()
            user_faved = Favorite.objects.filter(user=user, post=post).exists()

            posts_data.append({
                "post_id": post.id,
                "user": post.user.username,
                "name": Post.get_name(post.user),
                "profile_picture": post.user.profile_picture if post.user.profile_picture else None,
                "body": post.body,
                "created_at": format_time(post.created_at),
                "likes": post.likes_number,
                "comments_number": post.comments_number,
                "user_liked": user_liked,
                "user_faved": user_faved,
                "images": [{"url": pic.photo_url} for pic in post.pictures.all()],
                "labels": [label.label.name for label in post.labels.all()],
            })

        connection.close()
        return Response({
            "total_count": paginator.count,
            "total_pages": paginator.num_pages,
            "current_page": paginated_posts.number,
            "posts": posts_data,
        }, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al obtener los posteos populares: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
from django.db.models import Q

def filter_posts_by_labels(data, user, order_by):
    # Construimos filtros dinámicos usando Q
    label_ids = [item["id"] for item in data if not item["is_user"]]
    user_ids = [item["id"] for item in data if item["is_user"]]

    # Creamos una consulta combinada para etiquetas y usuarios
    filters = Q()
    if label_ids:
        filters |= Q(labels__label__id__in=label_ids)
    if user_ids:
        filters |= Q(user__id__in=user_ids)

    # Filtrar posts según los filtros combinados y ordenar en SQL
    posts = (
        Post.objects.filter(filters)
        .distinct()  # Nos aseguramos de que no haya duplicados
        .order_by(order_by, "-id")[:30]  # Ordenamos y limitamos en SQL
    )

    connection.close()
    return posts


import uuid

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def search_labels(request):
    search_term = request.data.get("q", None)  # Obtener la consulta de búsqueda
    if not search_term:
        return Response({"results": []}, status=status.HTTP_200_OK)

    # Filtrar etiquetas que contengan el término de búsqueda (case insensitive)
    matching_labels = Label.objects.filter(name__icontains=search_term)
    matching_users = User.objects.filter(username__icontains=search_term)

    # Construir la lista de resultados para las etiquetas
    labels_data = [
        {
            "id": label.id,
            "id_front": str(uuid.uuid4()),  # Generar un ID único para el frontend
            "name": label.name,
            "is_user": False,  # Esto indica que es una etiqueta
        }
        for label in matching_labels
    ]

    # Construir la lista de resultados para los usuarios
    users_data = [
        {
            "id": user.id,
            "id_front": str(uuid.uuid4()),  # Generar un ID único para el frontend
            "name": user.username,
            "profile_picture": user.profile_picture if user.profile_picture else None,
            "is_user": True,  # Esto indica que es un usuario
        }
        for user in matching_users
    ]

    # Combinar ambos resultados en una sola lista
    results = labels_data + users_data

    # Cerrar la conexión de la base de datos
    connection.close()

    # Devolver la respuesta con los resultados
    return Response({"results": results}, status=status.HTTP_200_OK)


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
        
        # Eliminar fotos asociadas
        post.deletePictures()
        
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
    

