import pandas as pd
from django.core.management.base import BaseCommand
from django.contrib.postgres.search import SearchVector
from django.db.models import Value, F, Func
from productos.models import Producto

class Command(BaseCommand):
    help = 'Actualiza el search_vector usando nombres de marca y tipo de producto desde un CSV'

    def handle(self, *args, **kwargs):
        # Cargar los CSV con pandas
        marcas_df = pd.read_csv('C:/Users/celih/Downloads/productos_marcaproducto.csv')  # CSV con id_marca y nombre_marca
        tipos_df = pd.read_csv('C:/Users/celih/Downloads/productos_tipoproducto.csv')    # CSV con id_tipo y nombre_tipo

        # Convertir DataFrames a diccionarios
        marca_dict = dict(zip(marcas_df['id'], marcas_df['nombre']))
        tipo_dict = dict(zip(tipos_df['id'], tipos_df['nombre']))

        # Obtener todos los productos
        productos = Producto.objects.all()

        # Crear una lista para almacenar las actualizaciones
        updates = []

        for producto in productos:
            # Obtener los nombres de marca y tipo basados en el id
            nombre_marca = marca_dict.get(producto.marca_id, '')
            nombre_tipo = tipo_dict.get(producto.tipo_id, '')

            # Actualizar el search_vector usando los nombres obtenidos
            search_vector = (
                SearchVector('nombre', config='spanish') +
                SearchVector('denominacion', config='spanish') +
                SearchVector('rnpa', config='spanish')
            )

            if nombre_marca:
                search_vector += SearchVector(Value(nombre_marca), config='spanish')  # Nombre de la marca desde el CSV
            if nombre_tipo:
                search_vector += SearchVector(Value(nombre_tipo), config='spanish')    # Nombre del tipo desde el CSV

            # Almacenar la actualización
            updates.append((producto.id, search_vector))

        # Realizar la actualización en batch
        for producto_id, vector in updates:
            Producto.objects.filter(id=producto_id).update(search_vector=vector)

        self.stdout.write(self.style.SUCCESS('Search vectors actualizados correctamente.'))
