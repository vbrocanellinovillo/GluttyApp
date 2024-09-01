from django.core.exceptions import ValidationError

# Función de validación para los números de teléfono
def validate_phone(value):
    # if not value.isdigit():
    #     raise ValidationError("El número de teléfono debe contener solo dígitos.")
    if len(value) > 15 or len(value) < 13:  # Asumiendo que el teléfono debe tener 10 dígitos
        print(len(value))
        print(value)
        raise ValidationError("La cantidad de dígitos del teléfono no corresponde.")
    return value