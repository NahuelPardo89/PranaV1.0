from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import viewsets, permissions, status, generics, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from apps.users.models import User
from apps.users.api.serializers import (
    UserSerializer, UserListSerializer, LoginSerializer,
    PasswordSerializer, RegisterUserSerializer, UserShortSerializer,
    UserAdminSerializer, LogoutSerializer
)


# ADMIN VIEWS
class UserAdminViewSet(viewsets.GenericViewSet):
    model = User
    serializer_class = UserAdminSerializer
    list_serializer_class = UserListSerializer
    permission_classes = [permissions.IsAdminUser, ]
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects\
                .filter(is_active=True)\
                .values('id', 'dni', 'email', 'name', 'last_name', 'phone','password','is_active', 'is_staff')
        return self.queryset

    def list(self, request):
        users = self.get_queryset()
        users_serializer = self.list_serializer_class(users, many=True)
        return Response(users_serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            return Response({
                'message': 'Usuario creado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro',
            'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        user = self.get_object(pk)
        doctor = user.doctorProfile
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)

    def update(self, request, pk=None):
        user = self.get_object(pk)

        user_serializer = UserSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'Usuario actualizado correctamente'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Hay errores en la actualización',
            'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        user_destroy = self.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:
            return Response({
                'message': 'Usuario eliminado correctamente'
            },status=status.HTTP_204_NO_CONTENT)
        return Response({
            'message': 'No existe el usuario que desea eliminar'
        }, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def reset_password(self, request, pk=None):
        user = self.get_object(pk)
        user.set_password(str(user.dni))
        user.save()
        return Response({
            'message': 'La contraseña del usuario se ha restablecido correctamente'
        }, status=status.HTTP_200_OK)

# NORMAL USERS VIEWS


class LoggedUserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    @action(detail=False, methods=['post'])
    def set_password(self, request):
        user = request.user
        password_serializer = PasswordSerializer(data=request.data)
        if password_serializer.is_valid():
            user.set_password(password_serializer.validated_data['password'])
            user.save()
            return Response({'message': 'Contraseña actualizada correctamente'})
        return Response({'message': 'Hay errores en la información enviada', 'errors': password_serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            user.last_login = timezone.now()
            user.save()
            refresh = RefreshToken.for_user(user)

            # Determina los perfiles del usuario
            roles = self.get_user_roles(user)

            return Response({
                "user": UserShortSerializer(user, context=self.get_serializer_context()).data,
                "roles": roles,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Usuario logueado con éxito"
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Usuario o Contraseña incorrecto"}, status=status.HTTP_400_BAD_REQUEST)

    def get_user_roles(self, user):
        roles = []
        if hasattr(user, 'patientProfile'):
            roles.append('Paciente')
        if hasattr(user, 'doctorProfile'):
            roles.append('Profesional')
        if hasattr(user, 'seminaristProfile'):
            roles.append('Tallerista')
        if user.is_staff:
            roles.append('Administrador')
        return roles


class LogoutAPI(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            refresh_token = serializer.validated_data.get("refresh")

            if not refresh_token:
                return Response({"message": "No se proporcionó token de actualización"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Sesión cerrada con éxito"}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterUserSerializer

    def post(self, request):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": UserShortSerializer(user, context=self.get_serializer_context()).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Usuario creado con éxito"
            }, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
