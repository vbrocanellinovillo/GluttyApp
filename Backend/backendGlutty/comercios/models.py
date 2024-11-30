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
    
    def deletePicture(self, id_picture):
        print(f"id_picture: {id_picture}, branch_id: {self.id}")
        if id_picture:
            try:
                picture = PictureBranch.objects.get(id=id_picture, branch=self)
                cloudinary.api.delete_resources(picture.public_id, resource_type="image", type="upload")
                picture.delete()
            except PictureBranch.DoesNotExist:
                # Manejar el caso en que la imagen no exista
                print("La imagen no se encontró.")
                return False
        return True

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

# Modelo para las VISUALIZACIONES DE LAS SUCURSALES en el mapa
class BranchView(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="views")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
# Modelo para los HORARIOS de las sucursales
class Schedule(models.Model):
    DAYS_OF_WEEK = [
        (1, "Lunes"),
        (2, "Martes"),
        (3, "Miércoles"),
        (4, "Jueves"),
        (5, "Viernes"),
        (6, "Sábado"),
        (7, "Domingo"),
    ]

    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="schedules")
    day = models.PositiveSmallIntegerField(choices=DAYS_OF_WEEK)
    min_time = models.TimeField(blank=False, null=False)
    max_time = models.TimeField(blank=False, null=False)

    class Meta:
        unique_together = ('branch', 'day')  # Evitar duplicados de días para una sucursal
        ordering = ['branch', 'day']  # Ordenar por sucursal y día

    def __str__(self):
        return f"{self.get_day_display()} ({self.min_time} - {self.max_time}) - {self.branch.name}"
