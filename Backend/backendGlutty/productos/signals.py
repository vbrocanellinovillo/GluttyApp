# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.postgres.search import SearchVector
from .models import Producto

@receiver(post_save, sender=Producto)
def update_search_vector(sender, instance, **kwargs):
    instance.search_vector = (
        SearchVector('rnpa') + 
        SearchVector('nombre') + 
        SearchVector('denominacion') + 
        SearchVector('marca__nombre') + 
        SearchVector('tipo__nombre')
    )
    instance.save()