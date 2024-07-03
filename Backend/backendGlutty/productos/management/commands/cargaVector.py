from django.core.management.base import BaseCommand
from django.contrib.postgres.search import SearchVector
from productos.models import Producto, MarcaProducto, TipoProducto
from django.db.models import Subquery, OuterRef, Value

class Command(BaseCommand):
    help = 'Update search_vector field for all products'

    def handle(self, *args, **kwargs):
        # Subconsulta para obtener el nombre de la marca
        marca_subquery = MarcaProducto.objects.filter(id=OuterRef('marca_id')).values('nombre')[:1]

# Subconsulta para obtener el nombre del tipo de producto
        tipo_subquery = TipoProducto.objects.filter(id=OuterRef('tipo_id')).values('nombre')[:1]

# Obtener todos los productos y anotar los nombres de marca y tipo de producto
        productos = Producto.objects.annotate(
            marca_nombre=Subquery(marca_subquery),
            tipo_nombre=Subquery(tipo_subquery)
        )

        # Actualizar search_vector para todos los productos
        for producto in productos:
            producto.search_vector = (
                SearchVector('nombre', weight='A') +
                SearchVector('denominacion', weight='B') +
                SearchVector(Value(producto.marca_nombre), weight='C') +
                SearchVector(Value(producto.tipo_nombre), weight='D') +
                SearchVector('rnpa', weight='D')
            )
            producto.save()

        self.stdout.write(self.style.SUCCESS('Successfully updated search_vector for all products'))

# from django.core.management.base import BaseCommand
# from django.contrib.postgres.search import SearchVector
# from productos.models import Producto, MarcaProducto, TipoProducto
# from django.db.models import OuterRef, Subquery, Value

# class Command(BaseCommand):
#     help = 'Update search_vector field for all products'

#     def handle(self, *args, **kwargs):
#         # Subquery to get the name of the brand
#         marca_subquery = MarcaProducto.objects.filter(id=OuterRef('marca_id')).values('nombre')[:1]

#         # Subquery to get the name of the product type
#         tipo_subquery = TipoProducto.objects.filter(id=OuterRef('tipo_id')).values('nombre')[:1]

#         productos = Producto.objects.all()
#         for producto in productos:
#             producto_marca = marca_subquery.filter(id=producto.marca_id).first()
#             producto_tipo = tipo_subquery.filter(id=producto.tipo_id).first()
            
#             producto.search_vector = (
#                 SearchVector('nombre', weight='A') +
#                 SearchVector('denominacion', weight='B') +
#                 SearchVector(Value(producto_marca), weight='C') +
#                 SearchVector(Value(producto_tipo), weight='D') +
#                 SearchVector('rnpa', weight='D')
#             )
#             producto.save()
#         self.stdout.write(self.style.SUCCESS('Successfully updated search_vector for all products'))

# from django.core.management.base import BaseCommand
# from django.contrib.postgres.search import SearchVector
# from productos.models import Producto

# class Command(BaseCommand):
#     help = 'Update search_vector field for all products'

#     def handle(self, *args, **kwargs):
#         productos = Producto.objects.all()
#         for producto in productos:
#             producto.search_vector = (
#                 SearchVector('nombre', weight='A') +
#                 SearchVector('denominacion', weight='B') +
#                 SearchVector('marca__nombre', weight='C') +
#                 SearchVector('tipo__nombre', weight='D') +
#                 SearchVector('rnpa', weight='E')
#             )
#             producto.save()
#         self.stdout.write(self.style.SUCCESS('Successfully updated search_vector for all products'))
