from django.db import models
from usuarios.models import Celiac  # Importamos la relación con el celiaco

class BloodTest(models.Model):
    # Relación con el celiaco
    celiac = models.ForeignKey(Celiac, on_delete=models.CASCADE, related_name='estudios')

    # Datos específicos del estudio
    test_date = models.DateField()  # Fecha del estudio
    registration_date = models.DateField(auto_now_add=True)  # Fecha en que se registra en el sistema
    
    
    
    # Valores de los estudios
    atTG_IgA = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, verbose_name='IgA anti Transglutaminasa')
    aDGP_IgA = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, verbose_name='IgA anti Gliadina Deaminada')
    
    # Opcionales
    antiendomisio = models.CharField(max_length=10, null=True, blank=True, choices=[("Positivo", "Positivo"), ("Negativo", "Negativo")], verbose_name='Anticuerpos antiendomisio (EMA)')
    hemoglobina = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    hematocrito = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    ferritina = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    hierro_serico = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    vitamina_b12 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    calcio_serico = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    vitamina_d = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    alt = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True, verbose_name='ALT (alanina aminotransferasa)')
    ast = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True, verbose_name='AST (aspartato aminotransferasa)')
    colesterol_total = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    colesterol_hdl = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    trigliceridos = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    glucemia = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    class Meta:
        verbose_name = "Estudio de Sangre"
        verbose_name_plural = "Estudios de Sangre"

    def __str__(self):
        return f"Estudio de {self.celiac.first_name} {self.celiac.last_name} - {self.test_date}"

class BloodTestVariables(models.Model):
    SEX = (("Male", "Male"), ("Female", "Female"), ("N/A", "No Aplica"))

    name = models.CharField(max_length=100)
    min_value = models.DecimalField(max_digits=5, decimal_places=2)
    max_value = models.DecimalField(max_digits=5, decimal_places=2)
    depends_on_sex = models.CharField(max_length=10, choices=SEX, default="N/A")
    description = models.CharField(max_length=500, null=True, blank=True)
    depends_on_age = models.CharField(max_length=20, blank=True, null=True)  # Por ejemplo "18-60 años"

    class Meta:
        verbose_name = "Variable de Estudio"
        verbose_name_plural = "Variables de Estudio"

    def __str__(self):
        return self.nombre