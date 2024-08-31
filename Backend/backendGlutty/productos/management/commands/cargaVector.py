from django.core.management.base import BaseCommand
from django.contrib.postgres.search import SearchVector
from comercios.models import Commerce

class Command(BaseCommand):
    help = 'Actualiza el campo search_vector para todos los comercios.'

    def handle(self, *args, **options):
        # Obtener todos los comercios
        commerces = Commerce.objects.all()

        # Lista para almacenar las actualizaciones
        updates = []

        for commerce in commerces:
            # Construir el contenido de búsqueda
            search_content = ' '.join(filter(None, [
                commerce.name,
                commerce.cuit,
                commerce.description,
            ]))

            # Crear el SearchVector a partir del contenido de búsqueda
            search_vector = SearchVector(search_content, config='spanish')

            # Agregar a la lista de actualizaciones
            updates.append(
                Commerce(
                    id=commerce.id,
                    search_vector=search_vector
                )
            )

        # Actualizar todos los comercios en un solo comando
        Commerce.objects.bulk_update(updates, ['search_vector'])

        self.stdout.write(self.style.SUCCESS('Se ha actualizado correctamente el search_vector para todos los comercios.'))
