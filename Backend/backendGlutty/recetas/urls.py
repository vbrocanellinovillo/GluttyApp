from django.urls import path
from .views import *

urlpatterns = [
    path("generate-recipe/", generate_recipe, name="generate_recipe"),
    path("save-message/", save_message, name="add_favorite"),
    path("get-message/", get_saved_message_by_id, name="get_saved_message_by_id"),
    path("get-all-messages/", get_saved_messages, name="get_saved_messages"),
]