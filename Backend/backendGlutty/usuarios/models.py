from django.db import models
import datetime
from django.utils import timezone
from django.contrib.auth.models import AbstractUser, Group, Permission
from .managers import *

# Create your models here.
# Clase para guardar datos generales
class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_commerce = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
    
# Clase para guardar datos específicos de la Persona celíaca
class Celiac(models.Model):
    SEXOS = (("MALE", "M"), ("FEMALE", "F"))
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="celiac")
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    sex = models.CharField(max_length=50, choices=SEXOS, default="MALE")
    date_birth = models.DateField(blank=False)
    
class Session(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="session")
    session_initialized = models.BooleanField(default=False)
    login_attempts = models.PositiveIntegerField(default=0)
    session_data = models.JSONField(null=True, blank=True)
    
    def __str__(self):
        return f"Session for {self.user.username}"