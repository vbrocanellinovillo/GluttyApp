from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.search import SearchVectorField, SearchVector
from django.db.models import F
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
    
    def save(self, *args, **kwargs):
        # Actualiza el search_vector antes de guardar
        self.search_vector = (
            SearchVector("nombre", config="spanish") +
            SearchVector("denominacion", config="spanish") +
            SearchVector("rnpa", config="spanish") +
            SearchVector(F('marca__nombre'), config="spanish") +  # Campo relacionado
            SearchVector(F('tipo__nombre'), config="spanish")    # Campo relacionado
        )
        super().save(*args, **kwargs)
        
class ProductoBarcode(models.Model):
    product_name_en = models.CharField(max_length=1000, verbose_name='Product Name (English)', null=True, blank=True)
    product_name_es = models.CharField(max_length=1000, verbose_name='Product Name (Spanish)', null=True, blank=True)
    generic_name = models.CharField(max_length=1000, verbose_name='Generic Name', null=True, blank=True)
    quantity = models.CharField(max_length=1000, verbose_name='Quantity', null=True, blank=True)
    serving_size = models.CharField(max_length=1000, verbose_name='Serving Size', null=True, blank=True)
    brands = models.CharField(max_length=1000, verbose_name='Brands', null=True, blank=True)
    categories = models.CharField(max_length=1000, verbose_name='Categories', null=True, blank=True)
    emb_codes = models.CharField(max_length=1000, verbose_name='Emb Codes', null=True, blank=True)
    allergens = models.CharField(max_length=1000, verbose_name='Allergens', null=True, blank=True)
    ean = models.CharField(max_length=255, verbose_name='EAN')
    rnpa = models.CharField(max_length=255, null=True, blank=True)

    searchvector = SearchVectorField(null=True, blank=True)

    def __str__(self):
        return f'{self.product_name_en} ({self.product_name_es})'

    class Meta:
        verbose_name_plural = 'Productos con Barcode'
