from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *

urlpatterns = [
    path("users-list/", UsuarioAPIView.as_view(), name="users-list"),
    path("register/", register, name="register"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("update/<int:user_id>/", update, name="update"),
    path("change-password/", changePassword, name="change-password"),
    path("delete/", delete, name="delete"),
    path("logout/", logout, name="logout"),
]
