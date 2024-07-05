from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.postgres.search import SearchVector
from productos.models import Producto, ProductoBarcode

@receiver(post_save, sender=Producto)
def update_producto_search_vector(sender, instance, **kwargs):
    # Actualizar el search_vector del Producto
    Producto.objects.filter(id=instance.id).update(
        search_vector=(
            SearchVector('rnpa') + 
            SearchVector('nombre') +
            SearchVector('denominacion')
        )
    )

@receiver(post_save, sender=ProductoBarcode)
def update_productobarcode_search_vector(sender, instance, **kwargs):
    # Actualizar el searchvector del ProductoBarcode
    ProductoBarcode.objects.filter(id=instance.id).update(
        searchvector=(
            SearchVector('product_name_en') +
            SearchVector('product_name_es') +
            SearchVector('generic_name') +
            SearchVector('brands') +
            SearchVector('categories') +
            SearchVector('ean') +
            SearchVector('rnpa')
        )
    )
