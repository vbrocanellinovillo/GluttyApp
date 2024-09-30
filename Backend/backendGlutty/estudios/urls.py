from django.urls import include, path
#from .views import *
from rest_framework import routers
from .views import *

# #Crear los routers
# router = routers.SimpleRouter()

# # Registrar los viewsets
# router.register(r'marcas', MarcaViewSet)
# router.register(r'tipos', TipoProductoViewSet)
# router.register(r'', ProductoViewSet)

# Incluir las URLs de los routers en urlpatterns
urlpatterns = [
    # path('', include(router.urls)),
    path("register/", register_study, name="register_study"),
    path("get-all-analysis/", get_all_analysis, name="get_all_analysis"),
    path("get-analysis/", get_analysis, name="get_analysis"),
    path("get-glutty-tips/", get_glutty_tips, name="get_glutty_tips"),
    path("get-initial-data/", get_initial_data, name="get_initial_data"),
    path("get-laboratories/", get_laboratories, name="get_laboratories"),
    path("save-medical-message/", save_medical_message, name="save_medical_message"),
    path("extract-values-pdf/", extract_medical_data, name="extract_values"),
    path("delete-analysis/", delete_analysis, name="delete_analysis"),
    path("get-statistics/", get_statistics, name="get_statistics"),
]