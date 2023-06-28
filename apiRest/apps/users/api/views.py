from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from apps.users.api.serializers import UserSerializer 
from apps.users.models import User

class UserAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request):
        users=User.objects.all()
        users_serializer=UserSerializer(users, many=True)
        return Response(users_serializer.data)

