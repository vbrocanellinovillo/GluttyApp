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
    path("search-labels/", search_labels, name="search_labels"),
    path("search-posts-by-labels/", search_posts_by_labels, name="search_posts_by_labels"),
    path("delete-post/", delete_post, name="delete_post"),
    path("delete-comment/", delete_comment, name="delete_comment"),
    path("delete-like/", delete_like, name="delete_like"),
    path("delete-favorite/", delete_favorite, name="delete_favorite"),
    ]