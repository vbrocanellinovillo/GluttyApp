from rest_framework import serializers
from .models import *

class LaboratoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratory
        fields = '__all__'
        
class GluttyTipsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GluttyTips
        fields = ['id', 'tip', 'image', 'title']  # Incluye los campos que deseas serializar
        
class BloodTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodTest
        fields = '__all__'