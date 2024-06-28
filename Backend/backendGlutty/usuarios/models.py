from django.db import models
import datetime
from django.utils import timezone
from django.contrib.auth.models import AbstractUser, Group, Permission
from .managers import *


# Create your models here.
class Usuario(AbstractUser):
    GENDERS = (("MALE", "M"), ("FEMALE", "F"), ("OTHER", "O"))

    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=50, choices=GENDERS, default="MALE")
    dateBirth = models.DateField(blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # groups = models.ManyToManyField(
    #     Group,
    #     related_name='usuarios_groups',
    #     blank=True,
    #     help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    #     verbose_name='groups',
    # )
    # user_permissions = models.ManyToManyField(
    #     Permission,
    #     related_name='usuarios_user_permissions',
    #     blank=True,
    #     help_text='Specific permissions for this user.',
    #     verbose_name='user permissions',
    # )

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

class Sesion(models.Model):
    user = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name="sesion")
    session_initialized = models.BooleanField(default=False)
    login_attempts = models.PositiveIntegerField(default=0)
    session_data = models.JSONField(null=True, blank=True)
    
    def __str__(self):
        return f"Session for {self.user.username}"