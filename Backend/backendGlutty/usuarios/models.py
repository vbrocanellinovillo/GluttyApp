from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from .managers import *

# Create your models here.
class Usuario(AbstractUser):
    GENDERS = (("MALE", "M"), ("FEMALE", "F"))

    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=50, choices=GENDERS, default="MALE")
    #dateBirth = models.DateField(blank=False)
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
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username 