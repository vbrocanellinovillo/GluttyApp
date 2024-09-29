from estudios.models import Laboratory, Variable, ReferenceValues

# Diccionario que contiene los valores de referencia
reference_values_data = [
    # IgA Anti-Transglutaminasa
    # {"lab_id": 1, "variable_id": 1, "min_value": 0, "max_value": 9.99, "sex": None, "min_age": None, "max_age": None},  # LACE Negativo
    # {"lab_id": 3, "variable_id": 1, "min_value": 0, "max_value": 19.99, "sex": None, "min_age": None, "max_age": None},  # ALLENDE Negativo
    # {"lab_id": 4, "variable_id": 1, "min_value": 0, "max_value": 19.99, "sex": None, "min_age": None, "max_age": None},  # HUMANA Negativo
    
    # # IgG Anti-Gliadina Deaminada
    # {"lab_id": 1, "variable_id": 2, "min_value": 0, "max_value": 9.99, "sex": None, "min_age": None, "max_age": None},  # LACE Negativo
    # {"lab_id": 3, "variable_id": 2, "min_value": 0, "max_value": 14.99, "sex": None, "min_age": None, "max_age": None},  # ALLENDE Negativo
    # {"lab_id": 4, "variable_id": 2, "min_value": 0, "max_value": 14.99, "sex": None, "min_age": None, "max_age": None},  # HUMANA Negativo
    
    # # IgA Anti-Gliadina
    # {"lab_id": 1, "variable_id": 3, "min_value": 0, "max_value": 11.99, "sex": None, "min_age": None, "max_age": None},  # LACE Negativo
    
    # # Hemoglobina
    # {"lab_id": 1, "variable_id": 5, "min_value": 12.0, "max_value": 16.0, "sex": None, "min_age": None, "max_age": None},  # LACE
    # {"lab_id": 3, "variable_id": 5, "min_value": 12.9, "max_value": 16.9, "sex": "Male", "min_age": None, "max_age": None},  # ALLENDE Hombres
    # {"lab_id": 3, "variable_id": 5, "min_value": 11.3, "max_value": 15.1, "sex": "Female", "min_age": None, "max_age": None},  # ALLENDE Mujeres
    # {"lab_id": 2, "variable_id": 5, "min_value": 13.5, "max_value": 17.0, "sex": "Male", "min_age": None, "max_age": None},  # PRIVADO Hombres
    # {"lab_id": 2, "variable_id": 5, "min_value": 12.0, "max_value": 15.0, "sex": "Female", "min_age": None, "max_age": None},  # PRIVADO Mujeres
    
    # # Hematocrito
    # {"lab_id": 1, "variable_id": 6, "min_value": 37.0, "max_value": 47.0, "sex": None, "min_age": None, "max_age": None},  # LACE
    # {"lab_id": 3, "variable_id": 6, "min_value": 40, "max_value": 52, "sex": "Male", "min_age": None, "max_age": None},  # ALLENDE Hombres
    # {"lab_id": 3, "variable_id": 6, "min_value": 36, "max_value": 47, "sex": "Female", "min_age": None, "max_age": None},  # ALLENDE Mujeres
    # {"lab_id": 2, "variable_id": 6, "min_value": 38.2, "max_value": 54.0, "sex": "Male", "min_age": None, "max_age": None},  # PRIVADO Hombres
    # {"lab_id": 2, "variable_id": 6, "min_value": 12.0, "max_value": 15.0, "sex": "Female", "min_age": None, "max_age": None},  # PRIVADO Mujeres
    
    # # Ferritina
    # {"lab_id": 1, "variable_id": 7, "min_value": 30, "max_value": 160, "sex": None, "min_age": None, "max_age": None},  # LACE
    
    # # Hierro Sérico
    # {"lab_id": 1, "variable_id": 8, "min_value": 40, "max_value": 145, "sex": None, "min_age": None, "max_age": None},  # LACE
    
    # Vitamina B12
    {"lab_id": 1, "variable_id": 9, "min_value": 179.0, "max_value": 1132.0, "sex": None, "min_age": None, "max_age": None},  # LACE
    {"lab_id": 3, "variable_id": 9, "min_value": 197.0, "max_value": 770.0, "sex": None, "min_age": None, "max_age": None},  # ALLENDE
    
    # Calcio Sérico
    {"lab_id": 3, "variable_id": 10, "min_value": 8.8, "max_value": 10.8, "sex": None, "min_age": "2", "max_age": "12"},  # ALLENDE
    {"lab_id": 3, "variable_id": 10, "min_value": 8.4, "max_value": 10.2, "sex": None, "min_age": "12", "max_age": "18"},  # ALLENDE
    {"lab_id": 3, "variable_id": 10, "min_value": 8.6, "max_value": 10.0, "sex": None, "min_age": "18", "max_age": "60"},  # ALLENDE
    {"lab_id": 3, "variable_id": 10, "min_value": 8.8, "max_value": 10.2, "sex": None, "min_age": "60", "max_age": "90"},  # ALLENDE
    {"lab_id": 3, "variable_id": 10, "min_value": 8.2, "max_value": 9.6, "sex": None, "min_age": "90", "max_age": None},  # ALLENDE
    {"lab_id": 4, "variable_id": 10, "min_value": 8.5, "max_value": 10.5, "sex": None, "min_age": None, "max_age": None},  # HUMANA
    
    # Vitamina D
    {"lab_id": 1, "variable_id": 11, "min_value": 20, "max_value": None, "sex": None, "min_age": None, "max_age": None},  # LACE
    {"lab_id": 3, "variable_id": 11, "min_value": 20, "max_value": None, "sex": None, "min_age": None, "max_age": None},  # ALLENDE
    {"lab_id": 4, "variable_id": 11, "min_value": 30, "max_value": 100, "sex": None, "min_age": None, "max_age": None},  # HUMANA
    
    # ALT (alanina aminotransferasa) GPT
    {"lab_id": 1, "variable_id": 12, "min_value": 5, "max_value": 38, "sex": None, "min_age": None, "max_age": None},  # LACE
    {"lab_id": 3, "variable_id": 12, "min_value": 10, "max_value": 35, "sex": "Female", "min_age": None, "max_age": None},  # ALLENDE Mujeres
    {"lab_id": 3, "variable_id": 12, "min_value": 0, "max_value": 31, "sex": "Female", "min_age": None, "max_age": None},  # HUMANA
    
    # AST (aspartato aminotransferasa) GOT
    {"lab_id": 1, "variable_id": 13, "min_value": 5, "max_value": 35, "sex": None, "min_age": None, "max_age": None},  # LACE
    {"lab_id": 3, "variable_id": 13, "min_value": 10, "max_value": 35, "sex": "Female", "min_age": None, "max_age": None},  # ALLENDE Mujeres
    {"lab_id": 4, "variable_id": 13, "min_value": 0, "max_value": 32, "sex": None, "min_age": None, "max_age": None},  # HUMANA
    
    # Colesterol total
    {"lab_id": 3, "variable_id": 14, "min_value": 0, "max_value": 200, "sex": None, "min_age": None, "max_age": None},  # ALLENDE
    {"lab_id": 2, "variable_id": 14, "min_value": 0, "max_value": 200, "sex": None, "min_age": None, "max_age": None},  # PRIVADO
    {"lab_id": 4, "variable_id": 14, "min_value": 0, "max_value": 200, "sex": None, "min_age": None, "max_age": None},  # HUMANA
    
    # Colesterol HDL
    {"lab_id": 3, "variable_id": 15, "min_value": 60, "max_value": None, "sex": "Female", "min_age": None, "max_age": None},  # ALLENDE
    {"lab_id": 3, "variable_id": 15, "min_value": 55, "max_value": None, "sex": "Male", "min_age": None, "max_age": None},  # ALLENDE
    {"lab_id": 2, "variable_id": 15, "min_value": 35, "max_value": None, "sex": None, "min_age": None, "max_age": None},  # PRIVADO
    {"lab_id": 4, "variable_id": 15, "min_value": 50, "max_value": None, "sex": None, "min_age": None, "max_age": None},  # HUMANA
    
    # Colesterol LDL
    {"lab_id": 3, "variable_id": 16, "min_value": 0, "max_value": 129, "sex": None, "min_age": None, "max_age": None},  # ALLENDE
    {"lab_id": 2, "variable_id": 16, "min_value": 0, "max_value": 139, "sex": None, "min_age": None, "max_age": None},  # PRIVADO
    {"lab_id": 4, "variable_id": 16, "min_value": 0, "max_value": 139, "sex": None, "min_age": None, "max_age": None},  # HUMANA
    
    # Triglicéridos
    {"lab_id": 3, "variable_id": 17, "min_value": 0, "max_value": 190, "sex": None, "min_age": None, "max_age": None},  # ALLENDE
    {"lab_id": 2, "variable_id": 17, "min_value": 0, "max_value": 150, "sex": None, "min_age": None, "max_age": None},  # PRIVADO
    {"lab_id": 4, "variable_id": 17, "min_value": 10, "max_value": 150, "sex": None, "min_age": None, "max_age": None},  # HUMANA
    
    # Glucosa
    {"lab_id": 1, "variable_id": 18, "min_value": 70, "max_value": 100, "sex": None, "min_age": None, "max_age": None},  # LACE
    {"lab_id": 3, "variable_id": 18, "min_value": 70, "max_value": 110, "sex": None, "min_age": None, "max_age": None},  # ALLENDE
    {"lab_id": 2, "variable_id": 18, "min_value": 76, "max_value": 110, "sex": None, "min_age": None, "max_age": None},  # PRIVADO
    {"lab_id": 4, "variable_id": 18, "min_value": 70, "max_value": 110, "sex": None, "min_age": None, "max_age": None},  # HUMANA
]

# Función para insertar los valores de referencia en la base de datos
def insert_reference_values():
    for ref_data in reference_values_data:
        ReferenceValues.objects.create(
            lab=Laboratory.objects.get(id=ref_data['lab_id']),
            variable=Variable.objects.get(id=ref_data['variable_id']),
            min_value=ref_data.get('min_value'),
            max_value=ref_data.get('max_value'),
            sex=ref_data.get('sex'),
            min_age=ref_data.get('min_age'),
            max_age=ref_data.get('max_age')
        )
    print("Valores de referencia insertados correctamente.")

# Llamada a la función
insert_reference_values()
