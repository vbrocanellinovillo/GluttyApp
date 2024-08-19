from django.urls import path
from .views import *

urlpatterns = [
    path("add-branch/", add_branch, name="add_branch"),
    path("get-branch/", get_branch, name="get_branch"),
    path("update-branch/", update_branch, name="update_branch"),
    path("delete-branch/", delete_branch, name="delete_branch"),
    path("upload-menu/", upload_menu, name="upload_menu"),
    path("get-menu/", get_menu, name="get_menu"),
    path("delete-menu/", delete_menu, name="delete_menu"),
    path("get-commerces/", get_commerces, name="get_commerces")
]