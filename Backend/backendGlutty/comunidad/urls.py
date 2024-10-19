from django.urls import path
from .views import *

urlpatterns = [
    path("create-post/", create_post, name="create_post"),
    path("get-post/", get_post_by_id, name="get_post_by_id"),
    path("add-like/", add_like, name="add_like"),
    path("add-comment/", add_comment, name="add_comment"),
    ]