# Generated by Django 5.0.6 on 2024-08-14 00:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comercios', '0012_commerce_menu_pages_commerce_menu_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='commerce',
            name='menu_pages',
        ),
    ]
