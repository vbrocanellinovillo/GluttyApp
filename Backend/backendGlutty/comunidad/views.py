from django.shortcuts import render
from django.forms import ValidationError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from requests import Response
from sqlalchemy import DateTime
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal, InvalidOperation
from datetime import date
from rest_framework import status
from rest_framework.response import Response
from usuarios.models import User
import re
import cloudinary.uploader
import cloudinary.api
import pdfplumber
import random
from .serializers import *
from django.db.models import Q
from datetime import timedelta
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from django.db import connection

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_post(request):
    username = request.user.username
    user = User.objects.filter(username=username).first()
    
    if not user:
        connection.close()
        return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    try:
        post_content = request.data.get("post")
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
        
        # Cerrar conexión con la base de datos
        connection.close()
        return Response({"Detail": f"Post creado correctamente."}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)