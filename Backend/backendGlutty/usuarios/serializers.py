from rest_framework import serializers
from .validations import validate_password
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "is_commerce",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        #password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

# Serializador de la contraseña
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value
    
class CeliacSerializer(serializers.ModelSerializer):
    class Meta:
        model = Celiac
        fields = ['first_name', 'last_name', 'sex', 'date_birth']