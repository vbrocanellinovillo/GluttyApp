from django.urls import path
from .views import *

urlpatterns = [
    path("create-post/", create_post, name="create_post"),
    path("get-post/", get_post_by_id, name="get_post_by_id"),
    path("add-like/", add_like, name="add_like"),
    path("add-comment/", add_comment, name="add_comment"),
    path("add-favorite/", add_favorite, name="add_favorite"),
    path("get-favorites/", get_favorites, name="get_favorites"),
    path("get-my-posts/", get_my_posts, name="get_my_posts"),  
    path("get-recent-posts/", get_recent_posts, name="get_recent_posts"),
    path("get-popular-posts/", get_popular_posts, name="get_popular_posts"), 
    ]