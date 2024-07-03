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
    # marca_nombre = MarcaSerializer(read_only = True)
    # #tipo_nombre = TipoProductoSerializer()
    # author_id = serializers.IntegerField(write_only=True)
    # name = serializers.CharField(max_length=50)
    # author = AuthorSerializer(read_only = True)
    
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