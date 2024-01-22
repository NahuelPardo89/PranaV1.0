from rest_framework import viewsets, status
from rest_framework.response import Response
from apps.seminar.models import Room, SeminarRoomUsage, SeminarInscription, Seminar, Payment
from .serializers import RoomSerializer, SeminarRoomUsageSerializer, SeminarInscriptionSerializer, SeminarSerializer
from apps.permission import IsAdminOrReadOnly
from apps.users.models import User


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAdminOrReadOnly, ]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            room = serializer.save()
            room.created_by = request.user
            room.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SeminarRoomUsageViewSet(viewsets.ModelViewSet):
    queryset = SeminarRoomUsage.objects.all()
    serializer_class = SeminarRoomUsageSerializer
# agrgar logica para cargar payment y y insurance


class SeminarInscriptionViewSet(viewsets.ModelViewSet):
    queryset = SeminarInscription.objects.all()
    serializer_class = SeminarInscriptionSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            inscription = serializer.save()
            inscription = request.user
            inscription.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SeminarViewSet(viewsets.GenericViewSet):

    queryset = Seminar.objects.all()
    serializer_class = SeminarSerializer

    def list(self, request):
        seminars = Seminar.objects.all()
        serializer = SeminarSerializer(seminars, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        seminar = self.get_object()
        serializer = SeminarSerializer(seminar)
        return Response(serializer.data)

    def create(self, request):
        serializer = SeminarSerializer(data=request.data)
        if serializer.is_valid():
            seminar = serializer.save()
            seminar.created_by = request.user
            seminar.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        seminar = self.get_object()
        serializer = SeminarSerializer(seminar, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        seminar = self.get_object()
        seminar.is_active = False
        seminar.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
