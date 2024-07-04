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
    path('find/', find, name='find'),
    path('find-marca/', find_by_marca, name='find-marca'),
    path('find-tipo/', find_by_tipo, name='find-tipo'),
    path('buscar/', buscar, name='buscar'),
]