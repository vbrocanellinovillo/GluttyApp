from django.db.models import Q
from productos.models import Producto
import re

# Fetch all Producto objects with nombre 'NO REGISTRA'
productos = Producto.objects.filter(nombre='-')

for producto in productos:
    denominacion = producto.denominacion
    
    # Condition 1: Use the part before '-', 'LIBRE', 'libre', '.', or ',' if any of them exist
    split_criteria = re.split(r'[-\.|,]|libre|LIBRE', denominacion)
    if split_criteria:
        new_nombre = split_criteria[0].strip()
    else:
        # Condition 2: Use the first 4 words if no split criteria found
        new_nombre = 'REVISAR'
    
    # Update the nombre field
    producto.nombre = new_nombre
    producto.save()

print("Database update complete.")

