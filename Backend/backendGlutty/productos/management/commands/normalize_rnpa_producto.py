import re
from productos.models import Producto

def normalize_rnpa_producto():
    productos = Producto.objects.all()
    for producto in productos:
        if producto.rnpa:
            rnpa = producto.rnpa
            # Si contiene una barra (/), dejarlo como está
            if '/' in rnpa:
                normalized_rnpa = rnpa
            # Si tiene un guión (-) y tiene 8 dígitos, quitar el guión
            elif '-' in rnpa and len(re.sub(r'\D', '', rnpa)) == 8:
                normalized_rnpa = rnpa.replace('-', '')
            # Si no tiene caracteres especiales y tiene 9 dígitos, quitar el primer número si es 0
            elif len(re.sub(r'\D', '', rnpa)) == 9 and rnpa[0] == '0':
                normalized_rnpa = rnpa[1:]
            else:
                normalized_rnpa = rnpa
            
            if normalized_rnpa != rnpa:
                print(f"Actualizando RNPA de Producto '{producto.id}': '{rnpa}' -> '{normalized_rnpa}'")
                producto.rnpa = normalized_rnpa
                producto.save()

normalize_rnpa_producto()

