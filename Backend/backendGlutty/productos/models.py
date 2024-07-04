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
        
    def get_marca_nombre(self):
        if self.marca:
            return self.marca.nombre
        return ''
        
