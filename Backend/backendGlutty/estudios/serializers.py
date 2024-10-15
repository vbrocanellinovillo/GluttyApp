from rest_framework import serializers
from .models import *
from datetime import date

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
        extra_kwargs = {
            'celiac': {'read_only': True}  # Marcar el campo celiac como de solo lectura
        }
        
    def validate_test_date(self, value):
        # Verificar que la fecha del test sea mayor a la fecha actual
        if value >= date.today():
            raise serializers.ValidationError("La fecha del análisis debe ser previa a la fecha actual.")
        return value
    
    def validate(self, data):
        # Convierte los valores 'undefined' y 'null' a None
        for key, value in data.items():
            if value in ['undefined', 'null']:
                data[key] = None
        return data