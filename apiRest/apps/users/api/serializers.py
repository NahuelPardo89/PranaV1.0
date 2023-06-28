from django.contrib.auth import authenticate

from rest_framework import serializers 
from apps.users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'

class LoginSerializer(serializers.Serializer):
    dni = serializers.IntegerField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data.get('dni'), password=data.get('password'))
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Usuario o contraseña incorrecto")     