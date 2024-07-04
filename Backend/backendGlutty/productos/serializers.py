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
    class Meta:
        model = Producto
        fields = [
            "id",
            "rnpa",
            "marca",
            "tipo",
            "nombre",
            "denominacion",
        ]