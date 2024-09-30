from .models import *
from rest_framework import serializers

class LaboratoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Laboratory
        fields = '__all__'