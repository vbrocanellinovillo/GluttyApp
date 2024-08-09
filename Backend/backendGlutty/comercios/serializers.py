from .models import *
from rest_framework import serializers
from .validations import *

class CommerceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commerce
        fields = ['name', 'cuit', 'description']
        
class BranchSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(validators=[validar_telefono])
    optional_phone = serializers.CharField(validators=[validar_telefono], required=False, allow_blank=True)

    class Meta:
        model = Branch
        fields = '__all__'