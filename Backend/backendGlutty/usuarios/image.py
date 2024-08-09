from django.conf import settings
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from rest_framework.response import Response
from rest_framework import status

cloudinary.config(
    cloud_name=settings.CLOUDINARY['cloud_name'],
    api_key=settings.CLOUDINARY['api_key'],
    api_secret=settings.CLOUDINARY['api_secret'],
    secure=True
)

def upload_to_cloudinary(image):
    upload_result = cloudinary.uploader.upload(image)
    image_url = upload_result.get('secure_url')

    # Optimize delivery by resizing and applying auto-format and auto-quality
    optimize_url, _ = cloudinary_url(image_url, fetch_format="auto", quality="auto")
    return optimize_url