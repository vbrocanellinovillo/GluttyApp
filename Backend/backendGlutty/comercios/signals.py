from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.postgres.search import SearchVector
from comercios.models import Commerce, Branch, Location

@receiver(post_save, sender=Branch)
@receiver(post_delete, sender=Branch)
def update_commerce_search_vector(sender, instance, **kwargs):
    if instance.commerce:
        instance.commerce.save()

@receiver(post_save, sender=Location)
def update_branch_search_vector(sender, instance, **kwargs):
    if instance.branch and instance.branch.commerce:
        instance.branch.commerce.save()
