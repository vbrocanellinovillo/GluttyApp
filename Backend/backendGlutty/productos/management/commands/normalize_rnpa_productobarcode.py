import re
from productos.models import ProductoBarcode

def extract_rnpa_from_emb_codes():
    productos_barcode = ProductoBarcode.objects.all()
    for barcode in productos_barcode:
        if barcode.emb_codes:
            # Borrar datos anteriores de rnpa
            barcode.rnpa = None
            
            # Buscar el RNPA en el campo emb_codes
            rnpa_match = re.search(r'RNPA\s*([\d-]+)', barcode.emb_codes)
            if rnpa_match:
                rnpa = rnpa_match.group(1)
                # Eliminar cualquier caracter no numérico del RNPA encontrado
                rnpa = re.sub(r'\D', '', rnpa)
                # Normalizar rnpa si tiene formato RNPA XX-XXXXXX
                if re.match(r'^\d{2}-\d{6}$', rnpa):
                    rnpa = rnpa.replace('-', '')
                # Asegurar que el RNPA tenga 8 dígitos
                if len(rnpa) == 8:
                    barcode.rnpa = rnpa
                    print(f"RNPA encontrado y normalizado en emb_codes para ProductoBarcode ID {barcode.id}: {barcode.rnpa}")
                else:
                    print(f"Formato RNPA inválido en emb_codes para ProductoBarcode ID {barcode.id}: {rnpa}")
            else:
                print(f"No se encontró RNPA en emb_codes para ProductoBarcode ID {barcode.id}")
            
            barcode.save()

extract_rnpa_from_emb_codes()
