from django.urls import path
from .views import *

urlpatterns = [
    path("add-branch/", add_branch, name="add-branch"),
]