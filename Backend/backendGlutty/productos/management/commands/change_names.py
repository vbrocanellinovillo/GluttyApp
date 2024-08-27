from django.db import transaction
from productos.models import Producto

# Lista de nombres base a actualizar
nombres_base = [
    "NO", "NO9 REGISTRA", "NO APLICA", "NO CONTIENE", "NO CORRESPONDE", "NO POSEE", "NO REGISTA", "NO REGISTRA", 
    "NOREGISTRA", "NO REGISTRAR", "NO REGISTRAS", "NO REGISTRO", "NO REGISTRRA", "NO REGISTRTA", 
    "NO REGRISTRA", "NO REGSTRA", "NO REGUISTRA", "NO REGUSTRA", "NO RESGISTRA", "NO RGISTRA", "N/C"
]

@transaction.atomic
def actualizar_nombres_productos():
    # Limpiar el nombre de espacios, comillas y puntos antes de comparar
    productos = Producto.objects.all()
    actualizados = 0

    for producto in productos:
        nombre_limpio = producto.nombre.strip().replace('"', '').replace('.', '')

        if nombre_limpio in nombres_base:
            # Tomar las primeras 4 palabras de la denominacion
            nuevas_palabras = producto.denominacion.split()[:4]
            nuevo_nombre = " ".join(nuevas_palabras)

            # Actualizar el campo nombre
            producto.nombre = nuevo_nombre
            producto.save()
            actualizados += 1

    print(f"{actualizados} productos actualizados.")

# Ejecutar la función para actualizar los productos
actualizar_nombres_productos()
