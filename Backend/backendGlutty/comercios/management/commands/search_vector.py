from django.core.management.base import BaseCommand
from django.contrib.postgres.search import SearchQuery, SearchRank
from comercios.models import Commerce
from django.db.models import F

class Command(BaseCommand):
    help = 'Search and rank Commerce records based on the search vector'

    def handle(self, *args, **kwargs):
        query = 'mc donalds'  # Adjust this as needed
        search_query = SearchQuery(query, config='spanish')
        results = Commerce.objects.annotate(rank=SearchRank(F('search_vector'), search_query)).filter(rank__gte=0.1).order_by('-rank')

        # Debugging output
        for commerce in results:
            self.stdout.write(self.style.SUCCESS(f"{commerce.name} - {commerce.search_vector}"))

