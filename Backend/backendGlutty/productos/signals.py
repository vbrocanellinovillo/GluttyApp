from django.db.models.signals import post_save
from django.dispatch import receiver
from productos.models import Producto
from django.contrib.postgres.search import SearchVector, SearchQuery

@receiver(post_save, sender=Producto)
def update_search_vector(sender, instance, **kwargs):
    if not kwargs.get('raw', False):  # Avoid processing raw saves
        marca_nombre = instance.get_marca_nombre()
        tipo_nombre = instance.tipo.nombre if instance.tipo else ''
        
        # Construct the search vector using direct field references
        search_vector = SearchVector(
            SearchQuery(instance.nombre, config='spanish'),
            SearchQuery(instance.denominacion, config='spanish'),
            SearchQuery(instance.rnpa),
            SearchQuery(marca_nombre, config='spanish'),
            SearchQuery(tipo_nombre, config='spanish')
        )
        
        # Update the search_vector field
        Producto.objects.filter(pk=instance.pk).update(search_vector=search_vector)
