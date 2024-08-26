from .models import *
from rest_framework import serializers
from .validations import *

class CommerceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commerce
        fields = ['name', 'cuit', 'description']
        
class BranchSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(validators=[validate_phone])
    optional_phone = serializers.CharField(validators=[validate_phone], required=False, allow_blank=True)

    class Meta:
        model = Branch
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['address', 'latitude', 'longitude']