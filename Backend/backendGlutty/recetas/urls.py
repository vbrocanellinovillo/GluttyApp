from django.urls import path
from .views import *

urlpatterns = [
    path('generate-recipe/', generate_recipe, name='generate_recipe'),
]