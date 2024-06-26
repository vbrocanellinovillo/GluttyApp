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