# Generated by Django 5.0.6 on 2024-07-01 21:35

import django.contrib.postgres.indexes
import django.contrib.postgres.search
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0004_alter_producto_denominacion_alter_producto_nombre'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='search_vector',
            field=django.contrib.postgres.search.SearchVectorField(blank=True, null=True),
        ),
        migrations.AddIndex(
            model_name='producto',
            index=django.contrib.postgres.indexes.GinIndex(fields=['search_vector'], name='productos_p_search__06d087_gin'),
        ),
    ]
