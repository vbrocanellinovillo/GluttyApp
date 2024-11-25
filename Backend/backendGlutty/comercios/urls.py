from django.urls import path
from .views import *

urlpatterns = [
    path("add-branch/", add_branch, name="add_branch"),
    path("get-branch/", get_branch, name="get_branch"),
    path("update-branch/", update_branch, name="update_branch"),
    path("delete-branch/", delete_branch, name="delete_branch"),
    path("upload-menu/", upload_menu, name="upload_menu"),
    # path("get-menu/", get_menu, name="get_menu"),
    path("delete-menu/", delete_menu, name="delete_menu"),
    path("get-branches-address/", get_branches_address, name="get_branches_address"),
    path("get-branches/", get_branches, name="get_branches"),
    path("get-menu/", get_menu, name="get_menu"),
    path("get-all-menues/", get_all_menues, name="get_all_menues"),
    path("search-commerce/", search_commerce, name="search_commerce"),
    path("get-dashboard/", get_info_dashboard, name="get_info_dashboard"),
]