# Generated by Django 5.0.6 on 2024-06-26 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0002_marcaproducto_alter_producto_marca_delete_marca'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='rnpa',
            field=models.CharField(max_length=255),
        ),
    ]