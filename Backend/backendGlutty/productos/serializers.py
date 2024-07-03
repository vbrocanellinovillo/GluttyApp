from rest_framework import serializers

from .models import *

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarcaProducto
        fields = [
            "id",
            "nombre",
        ]
        
class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = [
            "id",
            "nombre",
        ]
        
class ProductoSerializer(serializers.ModelSerializer):
    # marca_nombre = serializers.SerializerMethodField()
    # tipo_nombre = serializers.SerializerMethodField()
    marca_nombre = serializers.StringRelatedField(source='marca.nombre')
    tipo_nombre = serializers.StringRelatedField(source='tipo.nombre')
    
    class Meta:
        model = Producto
        fields = [
            "id",
            "rnpa",
            "marca_nombre",
            "tipo_nombre",
            "nombre",
            "denominacion",
        ]

    # def get_marca_nombre(self, obj):
    #     return obj.marca.nombre if obj.marca else None

    # def get_tipo_nombre(self, obj):
    #     return obj.tipo.nombre if obj.tipo else None