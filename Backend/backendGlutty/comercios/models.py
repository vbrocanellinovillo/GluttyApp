import cloudinary
from django.db import models
from usuarios.models import *
from django.contrib.postgres.search import SearchVectorField, SearchVector, SearchQuery
from django.db.models import F, Q
from django.contrib.postgres.indexes import GinIndex

# Create your models here.
# Modelo COMERCIO
class Commerce(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="commerce")
    name = models.CharField(max_length=50, blank=False)
    cuit = models.CharField(max_length=50, blank=False)
    description= models.CharField(max_length=300, blank=True, null=True)
    search_vector = SearchVectorField(null=True)

    class Meta:
        indexes = [
            GinIndex(fields=['search_vector']),
        ]
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Guardar primero el objeto sin el SearchVector
        self.update_search_vector()  # Actualizar después de la creación

    def update_search_vector(self):
        vector = SearchVector('name', 'cuit', 'description', config='spanish')
        Commerce.objects.filter(id=self.id).update(search_vector=vector)
            
    def getName(self):
        return self.name

    # menu_url = models.URLField(max_length=500, blank=True, null=True)
    # menu_pages = models.IntegerField(blank=True, null=True)

# Modelo SUCURSAL
class Branch(models.Model):
    commerce = models.ForeignKey(Commerce, on_delete=models.CASCADE, related_name="branches")
    name = models.CharField(max_length=255, blank=False)
    phone = models.CharField(max_length=20, blank=False, default=None)
    optional_phone = models.CharField(max_length=20, blank=True, null=True)
    separated_kitchen= models.BooleanField(default=False)
    just_takeaway= models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    def getLocation(self):
        return self.location
    
    def detelePicture(self, id_picture):
        if id_picture:
            picture = PictureBranch.objects.filter(id=id_picture, branch=self).first()
            cloudinary.api.delete_resources(picture.public_id, resource_type="image", type="upload")
            picture.delete()

# Modelo LINKS FOTOS DE SUCURSAL
class PictureBranch(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="photos")
    photo_url = models.URLField(max_length=500, blank=True, null=True)
    public_id = models.CharField(max_length=300, blank=False, default="")

# Modelo MENÚ
class Menu(models.Model):
    menu_url = models.URLField(max_length=500, blank=True, null=True)
    commerce = models.ForeignKey(Commerce, on_delete=models.CASCADE, related_name="menu")
    public_id = models.CharField(max_length=300, blank=False, default="")

# Modelo UBICACIÓN (para la ubicación de la sucursal)
class Location(models.Model):
    branch = models.OneToOneField(Branch, on_delete=models.CASCADE, related_name="location")
    address = models.CharField(max_length=255, blank=False)
    latitude =  models.FloatField(blank=False, null=False)
    longitude = models.FloatField(blank=False, null=False)