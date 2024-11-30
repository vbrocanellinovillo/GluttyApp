from datetime import date
from rest_framework import serializers
import re

def validate_password(value):
    if len(value) < 8:
        raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres.")
    if not re.search(r'\d', value):
        raise serializers.ValidationError("La contraseña debe contener al menos un número.")
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
        raise serializers.ValidationError("La contraseña debe contener al menos un carácter especial.")
    return value

def validate_datebirth(datebirth):
    if datebirth > date.today():
            raise serializers.ValidationError("La fecha de nacimiento debe ser previa a la fecha actual.")
    return datebirth