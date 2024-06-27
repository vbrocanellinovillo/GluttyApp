from django.urls import include, path
from .views import *
from rest_framework import routers

# Crear los routers
router = routers.SimpleRouter()

# Registrar los viewsets
router.register(r'marcas', MarcaViewSet)
router.register(r'tipos', TipoProductoViewSet)
router.register(r'', ProductoViewSet)

# Incluir las URLs de los routers en urlpatterns
urlpatterns = router.urls

# marcas_router = routers.SimpleRouter()
# tipo_producto_router = routers.SimpleRouter()

# marcas_router.register(r"marcas", MarcaViewSet)
# tipo_producto_router.register(r"tipoproducto", TipoProductoViewSet)

# urlpatterns = [
#     path('', include(marcas_router.urls)),
#     path('', include(tipo_producto_router.urls)),
# ]
# urlpatterns = [
#     path("marcas-list/", MarcaAPIView.as_view(), name="marcas-list"),
# ]