# Generated by Django 5.0.6 on 2024-11-23 15:40

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comercios', '0023_branchviews'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='BranchViews',
            new_name='BranchView',
        ),
    ]
