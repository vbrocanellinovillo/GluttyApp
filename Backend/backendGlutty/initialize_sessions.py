# usuarios/initialize_sessions.py

import os
import django

# Establecer la ruta correcta para tu configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backendGlutty.settings')  # Ajusta 'backendGlutty' según tu configuración
django.setup()

from usuarios.models import Usuario, Sesion  # Ajusta 'usuarios' según tu aplicación

def initialize_sessions():
    usuarios = Usuario.objects.all()
    for usuario in usuarios:
        if not hasattr(usuario, 'sesion'):
            Sesion.objects.create(user=usuario)
            print(f'Sesión creada para el usuario: {usuario.username}')
        else:
            print(f'El usuario {usuario.username} ya tiene una sesión.')

if __name__ == "__main__":
    initialize_sessions()

