from django.db import models
from usuarios.models import *

# Create your models here.
class Commerce(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="commerce")
    name = models.CharField(max_length=50, blank=False)
    cuit = models.CharField(max_length=50, blank=False)
    description= models.CharField(max_length=300, blank=True, null=True)

class Branch(models.Model):
    commerce = models.ForeignKey(Commerce, on_delete=models.CASCADE, related_name="branches")
    name = models.CharField(max_length=255, blank=False)
    phone = models.CharField(max_length=10, blank=False, default=None)
    optional_phone = models.CharField(max_length=10, blank=True, null=True)
    location = models.CharField(max_length=255, blank=False)
    separated_kitchen= models.BooleanField(default=False)
    just_takeaway= models.BooleanField(default=False)
    