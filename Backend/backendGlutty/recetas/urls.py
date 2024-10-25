from django.urls import path
from .views import *

urlpatterns = [
    path("generate-recipe/", generate_recipe, name="generate_recipe"),
    path("add-favorite/", add_favorite, name="add_favorite"),
    path("get-favorite/", get_favorite_by_id, name="get_favorite_by_id"),
    path("get-favorites/", get_favorites, name="get_favorites"),
]