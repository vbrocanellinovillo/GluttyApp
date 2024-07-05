import os
import pandas as pd
from django.core.management.base import BaseCommand
from productos.models import ProductoBarcode
from django.contrib.postgres.search import SearchVector


class Command(BaseCommand):
    help = 'Upload data from XLSX file to ProductoBarcode model'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the XLSX file')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']
        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f'File "{file_path}" does not exist'))
            return

        try:
            df = pd.read_excel(file_path, engine='openpyxl')
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error reading XLSX file: {str(e)}'))
            return

        # Define columns to handle missing data gracefully
        columns = ['product_name_en', 'product_name_es', 'generic_name', 'quantity', 
                   'serving_size', 'brands', 'categories', 'emb_codes', 'allergens', 'code']

        for index, row in df.iterrows():
            # Initialize empty strings for missing columns
            data = {col: row[col] if col in row.index else '' for col in columns}

            producto = ProductoBarcode(
                product_name_en=data['product_name_en'],
                product_name_es=data['product_name_es'],
                generic_name=data['generic_name'],
                quantity=data['quantity'],
                serving_size=data['serving_size'],
                brands=data['brands'],
                categories=data['categories'],
                emb_codes=data['emb_codes'],
                allergens=data['allergens'],
                ean=data['code'],
            )
            producto.save()

            # Generate SearchVector based on relevant fields
            search_vector = SearchVector(
                'product_name_en',
                'product_name_es',
                'generic_name',
                'brands',
                'categories',
                'allergens',
                'ean',
                'emb_codes'
            )
            ProductoBarcode.objects.filter(pk=producto.pk).update(searchvector=search_vector)

            self.stdout.write(self.style.SUCCESS(
                f'Successfully created ProductoBarcode {producto.id}: {producto.product_name_en} ({producto.product_name_es})'
            ))
