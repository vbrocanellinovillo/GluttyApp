from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.search import SearchVectorField
from django.db import models

# Create your models here.
class MarcaProducto(models.Model):
    nombre = models.CharField(max_length=255)
    
class TipoProducto(models.Model):
    nombre = models.CharField(max_length=255)

class Producto(models.Model):
    rnpa = models.CharField(max_length=255)
    marca = models.ForeignKey(MarcaProducto, on_delete=models.CASCADE, null=True)
    nombre = models.CharField(max_length=500, null=True)
    denominacion = models.CharField(max_length=500, null=True)
    tipo = models.ForeignKey(TipoProducto, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    search_vector = SearchVectorField(null=True, blank=True)

    class Meta:
        indexes = [
            GinIndex(fields=['search_vector']),
        ]
        
class ProductoSearchView(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=500)
    denominacion = models.CharField(max_length=500)
    rnpa = models.CharField(max_length=255)
    marca_nombre = models.CharField(max_length=255)
    tipo_nombre = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'producto_search_view'