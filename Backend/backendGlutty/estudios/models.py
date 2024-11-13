import cloudinary.api
from django.db import models
from sqlalchemy import null
from usuarios.models import Celiac  # Importamos la relación con el celiaco
import random
# from encrypted_model_fields.fields import EncryptedCharField, EncryptedDateField, EncryptedIntegerField
from secured_fields import EncryptedCharField, EncryptedDecimalField, EncryptedDateField

VARIABLE_MAP = {
    "IgA Anti-Transglutaminasa": "atTG_IgA",
    "IgG Anti-Gliadina Deaminada": "aDGP_IgA",
    "IgA Anti-Gliadina": "aDGP_IgG",
    "Anticuerpos antiendomisio (EMA)": "antiendomisio",
    "Hemoglobina": "hemoglobina",
    "Hematocrito": "hematocrito",
    "Ferritina": "ferritina",
    "Hierro Sérico": "hierro_serico",
    "Vitamina B12": "vitamina_b12",
    "Calcio Sérico": "calcio_serico",
    "Vitamina D": "vitamina_d",
    "ALT (alanina aminotransferasa)": "alt",
    "AST (aspartato aminotransferasa)": "ast",
    "Colesterol Total": "colesterol_total",
    "Colesterol HDL": "colesterol_hdl",
    "Colesterol LDL": "colesterol_ldl",
    "Triglicéridos": "trigliceridos",
    "Glucemia": "glucemia",
}

class BloodTest(models.Model):
    # Relación con el celiaco
    celiac = models.ForeignKey(Celiac, on_delete=models.CASCADE, related_name='estudios')

    # Datos específicos del estudio
    test_date = models.DateField(blank=False)  # Fecha del estudio
    #lab = models.CharField(max_length=150, blank=False, null=True, default=null) # Lugar en que se hizo el estudio
    lab = EncryptedCharField(max_length=150, blank=False, null=True, default=None)  # cifrado
    registration_date = models.DateField(auto_now_add=True)  # Fecha en que se registra en el sistema
    url = EncryptedCharField(max_length=500, blank=True, null=True)
    public_id = EncryptedCharField(max_length=300, null=True, default=None)
    
    # Valores de los estudios
    atTG_IgA = EncryptedCharField(max_length=8, null=True, blank=True, verbose_name='IgA anti Transglutaminasa', default=None)
    aDGP_IgA = EncryptedCharField(max_length=8, null=True, blank=True, verbose_name='IgA anti Gliadina Deaminada', default=None)
    aDGP_IgG = EncryptedCharField(max_length=8, null=True, blank=True, verbose_name='IgG anti Gliadina Deaminada', default=None)
    
    # Opcionales
    antiendomisio = EncryptedCharField(max_length=8, null=True, blank=True, choices=[("Positivo", "Positivo"), ("Negativo", "Negativo")], verbose_name='Anticuerpos antiendomisio (EMA)', default=None)
    hemoglobina = EncryptedDecimalField(max_digits=4, decimal_places=2, null=True, blank=True, default=None)
    hematocrito = EncryptedDecimalField(max_digits=4, decimal_places=2, null=True, blank=True, default=None)
    ferritina = EncryptedDecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)
    hierro_serico = EncryptedDecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)
    vitamina_b12 = EncryptedDecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)
    calcio_serico = EncryptedDecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)
    vitamina_d = EncryptedDecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)
    alt = EncryptedDecimalField(max_digits=4, decimal_places=2, null=True, blank=True, verbose_name='ALT (alanina aminotransferasa)', default=None)
    ast = EncryptedDecimalField(max_digits=4, decimal_places=2, null=True, blank=True, verbose_name='AST (aspartato aminotransferasa)', default=None)
    colesterol_total = EncryptedDecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)
    colesterol_hdl = EncryptedDecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)
    colesterol_ldl = EncryptedDecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)
    trigliceridos = EncryptedDecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)
    glucemia = EncryptedDecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)

    class Meta:
        verbose_name = "Estudio de Sangre"
        verbose_name_plural = "Estudios de Sangre"
        ordering = ['-test_date']

    def __str__(self):
        return f"Estudio de {self.celiac.first_name} {self.celiac.last_name} - {self.test_date}"
    
    def getDate(self):
        return self.test_date
    
    def getLab(self):
        return self.lab
    
    def getRegistrationDate(self):
        return self.registration_date
    
    def get_random_non_null_variable(self):
        """
        Retorna el nombre amigable de una variable aleatoria no nula.
        Si no hay ninguna, retorna None.
        """
        # Filtramos los campos que no son nulos
        non_null_fields = [(friendly_name, field_name) for friendly_name, field_name in VARIABLE_MAP.items() if getattr(self, field_name) is not None]
        
        if non_null_fields:
            # Seleccionamos una variable aleatoria no nula
            friendly_name, field_name = random.choice(non_null_fields)
            return friendly_name
        
        return None  # En caso de que todos los campos sean nulos
    
    def uploadPdf(self, file):
        file_type = file.content_type
        if file_type not in ["image/jpeg", "image/png", "application/pdf"]:
            return False
        
        upload_result = cloudinary.uploader.upload(file, resource_type='auto')
        url = upload_result['url']
        public_id = upload_result['public_id']
        
        self.url = url
        self.public_id = public_id
        self.save()
        return True
    
    # Método para eliminar estudio
    def deletePdf(self):
        if self.public_id:
            cloudinary.api.delete_resources(self.public_id, resource_type="image", type="upload")
            self.url = None
            self.public_id = None
            self.save()
            return True
    
# LABORATORIOS CARGADOS
class Laboratory(models.Model):
    name = models.CharField(max_length=300)
    
    def __str__(self):
        return self.name
    
    def getName(self):
        return self.name

class Variable(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=300)
    unit_of_measurement = models.CharField(max_length=50, null=True, default='hola')

    def __str__(self):
        return self.name
    
    def getName(self):
        return self.name
    
    def getDescription(self):
        return self.description
    
    def getUnitOfMeasurement(self):
        return self.unit_of_measurement
    
class ReferenceValues(models.Model):
    SEX = (("Male", "Male"), ("Female", "Female"))
    
    lab = models.ForeignKey(Laboratory, on_delete=models.CASCADE, related_name='variables')
    variable = models.ForeignKey(Variable, on_delete=models.CASCADE)
    min_value = models.DecimalField(max_digits=5, null=True, decimal_places=2)
    max_value = models.DecimalField(max_digits=6, null=True, decimal_places=2)
    sex = models.CharField(max_length=10, null=True, choices=SEX, default=null)
    min_age = models.CharField(max_length=3, null=True, default=null)
    max_age = models.CharField(max_length=3, null=True, default=null)
    
    def __str__(self):
        return f"{self.variable} + {str(self.min_value)} + {str(self.max_value)}"

class GluttyTips(models.Model):
    tip = models.CharField(max_length=400, blank=False, null=False)
    image = models.URLField(max_length=500, blank=True, null=True)
    title = models.CharField(max_length=200, blank=True, null=True, default=null)
    
    def __str__(self):
        return self.tip