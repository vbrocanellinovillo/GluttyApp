from django.urls import path
from .views import *

urlpatterns = [
    # path('', apiOverView, name='api-overview'),
    path("users-list/", UsuarioAPIView.as_view(), name="users-list"),
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("update/<int:user_id>/", update, name="update"),
    path("change-password/", changePassword, name="change-password"),
    path("delete/", delete, name="delete"),
    path("logout/", logout, name="logout"),
]
