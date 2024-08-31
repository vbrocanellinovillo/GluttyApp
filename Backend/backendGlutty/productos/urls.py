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
<<<<<<< Updated upstream
    path('find/', find, name='find'),
    path('find-filtro/', find_by_filtro, name='find-filtro'),
    path('find-by-barcode/', find_by_barcode, name='find-by-barcode'),
    path('buscar/', buscar, name='buscar'),
=======
    path("find/", find, name="find"),
>>>>>>> Stashed changes
]