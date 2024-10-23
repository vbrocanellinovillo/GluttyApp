from django.shortcuts import render
import json
from requests import Response
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from usuarios.models import User
from django.db import transaction
from django.db import connection
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from cohere.client import Client
from django.conf import settings
from django.http import JsonResponse
import json

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def generate_recipe(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    # Obtener la consulta del frontend
    user_prompt = request.POST.get('prompt', '')

    # Crear el historial de chat
    chat_history = request.session.get('chat_history', [])

    # Actualizar el historial con el nuevo mensaje del usuario
    chat_history.append({"role": "USER", "message": user_prompt})
    
    # Crear el preamble para la API de Cohere
    preamble = (
        "You are a kitchen assistant specialized in providing gluten-free recipes for people with celiac disease. "
        "You can only respond to questions about gluten-free cooking. If the user asks you anything other than gluten-free recipes, "
        "you must respond clearly, consistently, and concisely with the following message: "
        "\"Disculpa, solo puedo proveer recetas aptas para celiacos y consejos de cocina. :)\"\n\n"
        "Your job is to suggest safe gluten-free recipes that never contain wheat, barley, rye, or oats. "
        "If the user does not request a recipe, respond ONLY by stating that your job is to provide gluten-free recipes, and DO NOT suggest a recipe.\n\n"
        "Make sure the recipe uses only ingredients that are safe for people with celiac disease. "
        "Generate a detailed recipe that follows these rules and is gluten-free, including ingredients and clear steps.\n"
        "Always answer in Spanish."
    )

    # Conectar con la API de Cohere
    cohere_client = Client(api_key=settings.COHERE_API_KEY)
    
    try:
        # Realizar la solicitud a la API de Cohere usando 'chat'
        response = cohere_client.chat(
            message=user_prompt,
            model="command-r",  # Especificar el modelo
            preamble=preamble,
            chat_history=chat_history,
            stop_sequences=[" Disculpa, solo puedo proveer recetas aptas para celiacos y consejos de cocina. :)"]
        )
        
        # Extraer la respuesta generada
        generated_text = response.text.strip()
        chat_history.append({"role": "CHATBOT", "message": generated_text})
        
        # Limpiar el historial a los últimos 3 mensajes
        if len(chat_history) > 6:
            chat_history = chat_history[-6:]

        # Guardar el historial del usuario en la sesión
        request.session['chat_history'] = chat_history
        
        print("el chat history: \n", chat_history)
        
        print("esta es la respuesta de cohere:", response)
        # Devolver la respuesta al frontend
        return JsonResponse({'recipe': generated_text})

    except Exception as e:
        # Manejar errores de la API de Cohere
        return JsonResponse({'error': str(e)}, status=500)