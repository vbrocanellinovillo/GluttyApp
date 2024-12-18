from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *

urlpatterns = [
    path("users-list/", UsuarioAPIView.as_view(), name="users-list"),
    path("register/", register, name="register"),
    path('check-username/', check_username_availability, name='check_username'),
    path("login/", login, name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("update/<int:user_id>/", update, name="update"),
    path("change-password/", changePassword, name="change-password"),
    path("send-verification-code/", send_verification_code, name="send-verification-code"),
    path("verify-code/", verify_code, name="verify-code"),
    path("delete/", delete, name="delete"),
    path("logout/", logout, name="logout"),
    path("get-user/", get_user, name="get_user"),
    path("send-password-recovery-code/", send_password_recovery_code, name="send_password_recovery_code"),
    path("verify-recovery-code/", verify_recovery_code, name="verify_recovery_code"),
    path("report/", report, name="report"),
    path("get-reported-posts/", get_reported_posts, name="get_reported_posts"),
    path("get-reported-users/", get_reported_users, name="get_reported_users"),
    path("block-user/", block_user, name="block_user"),
    path("ban-post/", ban_post, name="ban_post"),
    path("resolve-report/", resolve_report, name="resolve_report"),
    path("resolve-post-report/", resolve_post_report, name="resolve_post_report"),
]