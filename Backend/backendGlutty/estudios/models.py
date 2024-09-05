from django.db import models
from usuarios.models import Celiac  # Importamos la relación con el celiaco

class EstudioSangre(models.Model):
    # Relación con el celiaco
    celiac = models.ForeignKey(Celiac, on_delete=models.CASCADE, related_name='estudios')

    # Datos específicos del estudio
    fecha_estudio = models.DateField()  # Fecha del estudio
    fecha_registro = models.DateField(auto_now_add=True)  # Fecha en que se registra en el sistema
    
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
        return f"Estudio de {self.celiac.first_name} {self.celiac.last_name} - {self.fecha_estudio}"

class VariableEstudio(models.Model):
    SEXO = (("M", "Masculino"), ("F", "Femenino"), ("N/A", "No Aplica"))

    nombre = models.CharField(max_length=100)
    valor_minimo = models.DecimalField(max_digits=5, decimal_places=2)
    valor_maximo = models.DecimalField(max_digits=5, decimal_places=2)
    depende_de_sexo = models.CharField(max_length=10, choices=SEXO, default="N/A")
    depende_de_edad = models.CharField(max_length=20, blank=True, null=True)  # Por ejemplo "18-60 años"

    class Meta:
        verbose_name = "Variable de Estudio"
        verbose_name_plural = "Variables de Estudio"

    def __str__(self):
        return self.nombre
