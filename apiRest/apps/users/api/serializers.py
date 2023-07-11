from django.contrib.auth import authenticate
from django.utils import timezone

from rest_framework import serializers 

from apps.users.models import User
from apps.usersProfile.models import PatientProfile, HealthInsurance


class UserShortSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=('dni','name','last_name')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('dni', 'email', 'name', 'last_name','phone')

class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('dni', 'email', 'name', 'last_name','phone', 'is_superuser')

class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
   

   
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

    def to_representation(self, instance):
        return {
            'id': instance['id'],
            'dni': instance['dni'],
            'name': instance['name'],
            'last_name': instance['last_name'],
            'email': instance['email'],
            'phone': instance['phone'],
        }

class LoginSerializer(serializers.Serializer):
    dni = serializers.IntegerField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data.get('dni'), password=data.get('password'))
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Usuario o contraseña incorrecto")     
    

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['dni', 'name', 'last_name', 'email', 'phone', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.last_login = timezone.now()
        user.set_password(password)
        user.save()
        
        patient_profile = PatientProfile.objects.create(user=user)
        try:
            particular_insurance = HealthInsurance.objects.get(name='Particular')
            patient_profile.insurances.add(particular_insurance)
        except HealthInsurance.DoesNotExist:
            print("La obra social 'Particular' no existe.")
        
        patient_profile.save()

        return user

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()