from django.db import models
from usuarios.models import *

# Create your models here.
class Commerce(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="commerce")
    name = models.CharField(max_length=50, blank=False)
    cuit = models.CharField(max_length=50, blank=False)
    social_reason = models.CharField(max_length=50, blank=False)
    description= models.CharField(max_length=300, blank=False)

class Branch(models.Model):
    commerce = models.OneToOneField(Commerce, on_delete=models.CASCADE, related_name="branch")
    number = models.IntegerField(max_length=50)
    location = models.CharField(max_length=255, blank=False)
    just_takeaway= models.BooleanField(default=False)
    