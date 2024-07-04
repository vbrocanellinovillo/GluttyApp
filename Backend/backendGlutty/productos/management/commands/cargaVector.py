# productos/management/commands/cargavector.py
from django.core.management.base import BaseCommand
from django.contrib.postgres.search import SearchVector, SearchQuery
from productos.models import Producto

class Command(BaseCommand):
    help = 'Actualiza el campo search_vector para todos los productos.'

    def handle(self, *args, **options):
        productos = Producto.objects.all()

        for producto in productos:
            marca_nombre = producto.get_marca_nombre()
            tipo_nombre = producto.tipo.nombre if producto.tipo else ''
            
            contenido_busqueda = ' '.join(filter(None, [
                producto.nombre,
                producto.denominacion,
                producto.rnpa,
                marca_nombre,
                tipo_nombre
            ]))
            
            search_vector = SearchVector(
                SearchQuery(contenido_busqueda, config='spanish')
            )
            
            producto.search_vector = search_vector
            producto.save(update_fields=['search_vector'])
            print()
        
        self.stdout.write(self.style.SUCCESS('Se ha actualizado correctamente el search_vector para todos los productos.'))


