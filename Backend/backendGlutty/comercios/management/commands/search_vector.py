from django.core.management.base import BaseCommand
from django.contrib.postgres.search import SearchVector
from comercios.models import Commerce

class Command(BaseCommand):
    help = 'Actualiza el campo search_vector para todos los comercios.'

    def handle(self, *args, **options):
        commerces = Commerce.objects.all()

        for commerce in commerces:
            search_content = ' '.join(filter(None, [
                commerce.name or '',
                commerce.description or '',
            ]))

            search_vector = SearchVector(search_content, config='spanish')
            commerce.search_vector = search_vector
            commerce.save(update_fields=['search_vector'])

        self.stdout.write(self.style.SUCCESS('Se ha actualizado correctamente el search_vector para todos los comercios.'))
