from django.core.exceptions import ValidationError

# Función de validación para los números de teléfono
def validar_telefono(value):
    if not value.isdigit():
        raise ValidationError("El número de teléfono debe contener solo dígitos.")
    if len(value) != 10:  # Asumiendo que el teléfono debe tener 10 dígitos
        raise ValidationError("El número de teléfono debe tener exactamente 10 dígitos.")
    return value