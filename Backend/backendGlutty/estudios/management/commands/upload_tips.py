import os
import sys

# Establecer la variable de entorno para Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backendGlutty.settings')  # Cambia 'tu_proyecto' por el nombre de tu proyecto

# Luego importa Django y otros módulos
import django
django.setup()

from django.core.management.base import BaseCommand
from estudios.models import GluttyTips  # Ajusta la importación según la estructura de tu proyecto
from django.conf import settings
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

# Configurar Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY['cloud_name'],
    api_key=settings.CLOUDINARY['api_key'],
    api_secret=settings.CLOUDINARY['api_secret'],
    secure=True
)

class Command(BaseCommand):
    help = 'Subir Glutty Tips con imágenes a la base de datos'

    def handle(self, *args, **kwargs):
        # Lista de tips y enlaces de imágenes
        tips_data = [
            {
                "tip": "Informa a tus familiares y amigos sobre tu enfermedad para evitar confusiones.",
                "image": "C:/GluttyTips/1.jpg"
            },
            {
                "tip": "En eventos familiares, pregunta sobre la preparación de los alimentos para asegurarte de que no haya contaminación cruzada.",
                "image": "C:/GluttyTips/2.jpg"
            },
            {
                "tip": "Ofrece llevar tus propios platos sin gluten a las reuniones familiares.",
                "image": "C:/GluttyTips/3.jpg"
            },
            {
                "tip": "Cuando comas en casa de amigos, pide preparar juntos alguna receta sin gluten.",
                "image": "C:/GluttyTips/4.jpg"
            },
            {
                "tip": "Habla con anticipación con los anfitriones sobre tu necesidad de alimentos sin gluten.",
                "image": "C:/GluttyTips/5.jpg"
            },
            {
                "tip": "Siempre pregunta si las salsas o aderezos servidos contienen gluten antes de consumirlos.",
                "image": "C:/GluttyTips/6.jpg"
            },
            {
                "tip": "Lleva contigo una porción de postre sin gluten a las reuniones, por si no hay opciones disponibles.",
                "image": "C:/GluttyTips/7.jpg"
            },
            {
                "tip": "Mantén siempre la comunicación abierta y explica cualquier duda que tengan sobre la dieta sin gluten.",
                "image": "C:/GluttyTips/8.jpg"
            },
            {
                "tip": "Si asistes a un evento con comida compartida, pide servirte primero para evitar la contaminación cruzada.",
                "image": "C:/GluttyTips/9.jpg"
            },
            {
                "tip": "En picnics o parrilladas, mantén tu comida separada y etiquetada claramente.",
                "image": "C:/GluttyTips/10.jpg"
            },
            {
                "tip": "No tengas miedo de hacer preguntas en restaurantes sobre los ingredientes y la preparación de los alimentos.",
                "image": "C:/GluttyTips/11.jpg"
            },
            {
                "tip": "Acepta que no todos entienden de inmediato tu enfermedad, educa con paciencia.",
                "image": "C:/GluttyTips/12.jpg"
            },
            {
                "tip": "Lleva siempre una barra de cereal o un snack sin gluten en tu bolso.",
                "image": "C:/GluttyTips/13.jpg"
            },
            {
                "tip": "Asegúrate de que el maquillaje y productos de cuidado personal que uses sean libres de gluten.",
                "image": "C:/GluttyTips/14.jpg"
            },
            {
                "tip": "Si consumes alcohol, asegúrate de que sea una opción sin gluten como sidra o vino.",
                "image": "C:/GluttyTips/15.jpg"
            },
            {
                "tip": "El autocuidado es clave: cuida tu salud mental tanto como tu dieta.",
                "image": "C:/GluttyTips/16.jpg"
            },
            {
                "tip": "Considera llevar una tarjeta médica con detalles sobre tu enfermedad en caso de emergencia.",
                "image": "C:/GluttyTips/17.jpg"
            },
            {
                "tip": "Si sientes frustración, busca apoyo en grupos de personas con celiaquía, ya sea online o en persona.",
                "image": "C:/GluttyTips/18.jpg"
            },
            {
                "tip": "Crea un grupo de apoyo con amigos que también estén interesados en la alimentación saludable.",
                "image": "C:/GluttyTips/19.jpg"
            },
            {
                "tip": "Aprende a cocinar nuevas recetas sin gluten, la variedad hace que la dieta sea más llevadera.",
                "image": "C:/GluttyTips/20.jpg"
            },
            {
                "tip": "Siempre prioriza tu salud, incluso si esto significa renunciar a ciertas salidas o eventos sociales.",
                "image": "C:/GluttyTips/21.jpg"
            },
        ]


        for data in tips_data:
            tip = data["tip"]
            image_path = data["image"]

            # Subir la imagen a Cloudinary
            if os.path.exists(image_path):
                try:
                    upload_result = cloudinary.uploader.upload(image_path)
                    image_url = upload_result.get('secure_url')

                    # Guardar el tip en la base de datos
                    GluttyTips.objects.create(tip=tip, image=image_url)
                    self.stdout.write(self.style.SUCCESS(f'Subido: {tip} con imagen: {image_url}'))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Error al subir la imagen: {e}'))
            else:
                self.stdout.write(self.style.WARNING(f'La imagen no existe: {image_path}'))
