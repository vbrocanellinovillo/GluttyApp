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
    path("extract-values-pdf/", extract_medical_data, name="extract_values"),
    path("delete-analysis/", delete_analysis, name="delete_analysis"),
]