# Generated by Django 5.0.6 on 2024-07-03 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0005_producto_search_vector_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductoSearchView',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=500)),
                ('denominacion', models.CharField(max_length=500)),
                ('rnpa', models.CharField(max_length=255)),
                ('marca_nombre', models.CharField(max_length=255)),
                ('tipo_nombre', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'producto_search_view',
                'managed': False,
            },
        ),
    ]