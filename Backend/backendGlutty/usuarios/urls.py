from django.urls import path
from .views import *

urlpatterns = [
    # path('', apiOverView, name='api-overview'),
    path("users-list/", UsuarioAPIView.as_view(), name="users-list"),
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("update/", update, name="update"),
    path("delete/", delete, name="delete"),
]
