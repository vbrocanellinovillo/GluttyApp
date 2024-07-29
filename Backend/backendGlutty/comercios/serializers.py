from .models import *
from rest_framework import serializers

class CommerceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commerce
        fields = ['name', 'cuit', 'social_reason', 'description']