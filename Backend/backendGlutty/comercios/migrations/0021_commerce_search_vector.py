# Generated by Django 5.0.6 on 2024-08-31 20:51

import django.contrib.postgres.search
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comercios', '0020_alter_branch_optional_phone_alter_branch_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='commerce',
            name='search_vector',
            field=django.contrib.postgres.search.SearchVectorField(null=True),
        ),
    ]
