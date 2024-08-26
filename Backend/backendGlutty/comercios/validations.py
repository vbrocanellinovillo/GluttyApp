from django.core.exceptions import ValidationError

# Función de validación para los números de teléfono
def validate_phone(value):
    # if not value.isdigit():
    #     raise ValidationError("El número de teléfono debe contener solo dígitos.")
    if len(value) > 14:  # Asumiendo que el teléfono debe tener 10 dígitos
        raise ValidationError("El número de teléfono no debe tener más de 10 dígitos.")
    return value