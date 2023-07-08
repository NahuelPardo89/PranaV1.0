from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import serializers 
from apps.users.models import User
from apps.usersProfile.models import PatientProfile, HealthInsurance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self,validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
class UserShortSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=('dni','name','last_name')

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('dni', 'email', 'name', 'last_name','phone')

class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=128, min_length=6, write_only=True)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError(
                {'password':'Debe ingresar ambas contraseñas iguales'}
            )
        return data

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
        # Crear el perfil del paciente para el usuario
        patient_profile = PatientProfile.objects.create(user=user)
        try:
            particular_insurance = HealthInsurance.objects.get(name='Particular')
            patient_profile.insurances.add(particular_insurance)
        except HealthInsurance.DoesNotExist:
            print("La obra social 'Particular' no existe.")
        
        patient_profile.save()

        return user