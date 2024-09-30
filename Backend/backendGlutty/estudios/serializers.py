from rest_framework import serializers
from estudios.models import GluttyTips

class GluttyTipsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GluttyTips
        fields = ['id', 'tip', 'image']  # Incluye los campos que deseas serializar
