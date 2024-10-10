from django.urls import include, path
from .views import *
from rest_framework import routers

# #Crear los routers
# router = routers.SimpleRouter()

# # Registrar los viewsets
# router.register(r'marcas', MarcaViewSet)
# router.register(r'tipos', TipoProductoViewSet)
# router.register(r'', ProductoViewSet)

# Incluir las URLs de los routers en urlpatterns
urlpatterns = [
    # path('', include(router.urls)),
    path("find/", find, name="find"),
    path("find-by-barcode/", find_by_barcode, name="find_by_barcode"),
    path("get-initial-data/", get_initial_data, name="get_initial_data"),
]