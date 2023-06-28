from rest_framework import viewsets,permissions,status,generics


from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken

from apps.users.api.serializers import UserSerializer , LoginSerializer
from apps.users.models import User

class UserAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request):
        users=User.objects.all()
        users_serializer=UserSerializer(users, many=True)
        return Response(users_serializer.data)

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Usuario logueado con éxito"
            },status=status.HTTP_200_OK)
        else:
            return Response({"message":"Usuario o Contraseña incorrecto"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def post(self, request):
        
        try:
            refresh_token = request.data.get("refresh")
            
            if not refresh_token:
                return Response({"message": "No se proporcionó token de actualización"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message":"Sesión cerrada con éxito"},status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)