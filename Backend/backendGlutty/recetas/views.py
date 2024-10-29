from django.shortcuts import get_object_or_404
from requests import Response
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from usuarios.models import User
from django.db import connection
from cohere.client import Client
from django.conf import settings
from django.http import JsonResponse
import uuid

# Función que establece comunicación con Cohere y el usuario
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ask_chatbot(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    # Obtener la consulta del frontend
    user_prompt = request.data.get("prompt", "")

    # Crear el historial de chat
    chat_history = request.session.get("chat_history", [])

    # Crear un mensaje con ID único
    user_message_id = str(uuid.uuid4())  # Genera un ID único
    # Actualizar el historial con el nuevo mensaje del usuario
    chat_history.append({"role": "USER", "message": user_prompt, "id": user_message_id})
    
    # Crear el preamble para la API de Cohere
    preamble = (
        "You are a kitchen assistant specialized in providing gluten-free recipes for people with celiac disease. "
        "You can only respond to questions about gluten-free cooking. If the user asks you anything other than gluten-free recipes, "
        "you must respond with the following message: "
        "\"Disculpa, solo puedo proveer recetas aptas para celiacos y consejos de cocina. :)\"\n\n"
        "Your job is to suggest safe gluten-free recipes that never contain wheat, barley, rye, or oats. "
        "If the user does not request a recipe, respond ONLY by stating that your job is to provide gluten-free recipes, and DO NOT suggest a recipe.\n\n"
        "Make sure the recipe uses only ingredients that are safe for people with celiac disease. "
        "Generate a detailed recipe that follows these rules and is gluten-free, including ingredients and clear steps.\n"
        "Always answer in Spanish."
        "Always add a short title summarizing what you said, in the last line of the text"
    )

    chat_history_send = [{"role": message["role"], "message": message["message"]} for message in chat_history]
    
    # Conectar con la API de Cohere
    cohere_client = Client(api_key=settings.COHERE_API_KEY)
    
    try:
        # Realizar la solicitud a la API de Cohere usando 'chat'
        response = cohere_client.chat(
            message=user_prompt,
            model="command-r-08-2024",  # Especificar el modelo
            preamble=preamble,
            chat_history=chat_history_send,
            stop_sequences=[" Disculpa, solo puedo proveer recetas aptas para celiacos y consejos de cocina. :)"]
        )
        
        # Extraer la respuesta generada
        generated_text= response.text.strip()
        
        # Crear un mensaje con ID único
        cohere_message_id = str(uuid.uuid4())  # Genera un ID único
        chat_history.append({"role": "CHATBOT", "message": generated_text, "id": cohere_message_id})
        
        # Limpiar el historial a los últimos 5 mensajes
        if len(chat_history) > 10:
            chat_history = chat_history[-10:]

        # Guardar el historial del usuario en la sesión
        request.session["chat_history"] = chat_history
        
        historial = request.session.get('chat_history', [])
        for mensaje in historial:
            print("\nmensaje: ", mensaje)
        
        print("\nesta es la respuesta de cohere:", response)
        # Devolver la respuesta al frontend
        return JsonResponse({"id_response": cohere_message_id, "response": generated_text}, status=status.HTTP_200_OK)

    except Exception as e:
        # Manejar errores de la API de Cohere
        return JsonResponse({"error": str(e)}, status=500)
    
    
# Función que guarda el mensaje marcado como favorito
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_save_message(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    message_id = request.data.get("id")
    if not message_id:
        return Response({"error": "Falta el ID del mensaje."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        message, chat_id, existing_message = None, None, None
        # Obtener el mensaje específico y marcarlo como favorito
        if is_uuid(message_id):
            chat_history = request.session.get("chat_history", [])
            
            for chat in chat_history:
                if chat["id"] == message_id:
                    message = chat["message"]
                    chat_id = chat["id"]
                    break
        
        if message:
            print('hello')
            existing_favorite = ChatMessage.objects.filter(user=user, chat_history_id=chat_id).first()
            
            if existing_favorite:
                existing_favorite.delete()
                connection.close()
                return Response({"detail": "Mensaje eliminado de favoritos."}, status=status.HTTP_200_OK)
            
            title = ask_for_title(message)
        
            chat_message = ChatMessage.objects.create(
                            user=user,
                            message=message,
                            title=title,
                            chat_history_id = chat_id
                        )
            
            chat_message.save()
            connection.close()
            return Response({"detail": "Mensaje marcado como favorito."}, status=status.HTTP_200_OK)
                
        elif not is_uuid(message_id):
            existing_message = ChatMessage.objects.filter(user=user, id=message_id).first()
            print(existing_message)
            if existing_message:
                # Eliminar si ya existe
                existing_message.delete()
                connection.close()
                return Response({"detail": "Mensaje eliminado de favoritos."}, status=status.HTTP_200_OK)

        elif not message and not existing_message:
            print('hehe')
            message_content = request.data.get("content")
            title = ask_for_title(message_content)
        
            chat_message = ChatMessage.objects.create(
                            user=user,
                            message=message_content,
                            title=title,
                            chat_history_id = message_id
                        )
            
            chat_message.save()
            connection.close()
            return Response({"detail": "Mensaje marcado como favorito."}, status=status.HTTP_200_OK)
                
    except Exception as e:
        return Response({"error": f"Error al marcar favorito: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def is_uuid(value):
    try:
        uuid.UUID(value)
        return True
    except ValueError:
        return False


# Función que le pregunta a Cohere un título para lo que el usuario quiera guardar
def ask_for_title(message):
    # Conectar con la API de Cohere
    cohere_client = Client(api_key=settings.COHERE_API_KEY)
    
    try:
        # Realizar la solicitud a la API de Cohere usando 'chat'
        response = cohere_client.chat(
            message=message,
            model="command-r-08-2024",  # Especificar el modelo
            preamble="Lo único que tenés que hacer es un título descriptivo de lo que te manda el usuario, que no diga sin gluten y que no contenga caracteres especiales",
            stop_sequences=["Disculpa, solo puedo proveer recetas aptas para celiacos y consejos de cocina. :)"]
        )
        
        # Extraer la respuesta generada
        return response.text.strip()
    
    except Exception as e:
        # Manejar errores de la API de Cohere
        return JsonResponse({"error": str(e)}, status=500)


# Función que trae un favorito según el id
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_saved_message_by_id(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    message_id = request.data.get("id")
    if not message_id:
        return Response({"error": "Falta el ID del mensaje."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        chat = get_object_or_404(ChatMessage, id=message_id, user=request.user)
        chat_data = {
            "message": chat.getMessage(),
            "title": chat.getTitle()
        }
        connection.close()
        return Response(chat_data, status=status.HTTP_200_OK)
           

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al obtener mensaje favorito: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# Función que trae todos los favoritos
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_saved_messages(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        favorites = user.messages.all()
        all_messages_data = []
        for fav in favorites:
            fav_data = {
                "id": fav.id,
                "title": fav.getTitle(),
                "message": fav.getMessage(),
                "created_at": fav.getCreatedAt()
            }
            all_messages_data.append(fav_data)
        connection.close()
        return Response(all_messages_data, status=status.HTTP_200_OK)

    except Exception as e:
        connection.close()
        return Response({"error": f"Error al obtener mensajes favoritos: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    