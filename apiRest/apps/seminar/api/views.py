from rest_framework import viewsets, status
from rest_framework.response import Response
from apps.seminar.models import Room, SeminarRoomUsage, SeminarInscription, Seminar, Payment, SeminarSchedule
from .serializers import RoomSerializer, SeminarRoomUsageSerializer, SeminarInscriptionSerializer, SeminarSerializer, SeminarScheduleSerializer
from apps.permission import IsAdminOrReadOnly


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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        active_seminars = instance.seminar_set.filter(is_active=True)
        if active_seminars.exists():
            seminar_names = ", ".join([str(seminar.name)
                                      for seminar in active_seminars])
            return Response({"detail": f"La sala está asociada a los seminarios activos: {seminar_names}. No se puede eliminar."}, status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class SeminarRoomUsageViewSet(viewsets.ModelViewSet):
    queryset = SeminarRoomUsage.objects.all()
    serializer_class = SeminarRoomUsageSerializer


class SeminarInscriptionViewSet(viewsets.ModelViewSet):
    """
    ViewSet class for handling SeminarInscription model instances.

    This ViewSet provides CRUD operations for SeminarInscription objects and supports customization
    of serialized output based on the 'display' query parameter.

    Attributes:
        queryset (QuerySet): The set of SeminarInscription instances.
        serializer_class (type): The serializer class for SeminarInscription instances.

    Methods:
        list(request): Retrieve a list of SeminarInscription instances with optional display customization.
        retrieve(request, pk=None): Retrieve a single SeminarInscription instance with optional display customization.
        create(request): Create a new SeminarInscription instance.

    """

    queryset = SeminarInscription.objects.all()
    serializer_class = SeminarInscriptionSerializer

    def list(self, request):
        """
        Retrieve a list of SeminarInscription instances with optional filters and display customization.

        Parameters:
            request (rest_framework.request.Request): The HTTP request.

        Returns:
            rest_framework.response.Response: The serialized data.

        """

        display = request.query_params.get('display', 'false') == 'true'
        inscriptions = SeminarInscription.objects.all()
        seminar = request.query_params.get('seminar')
        if seminar:
            inscriptions = inscriptions.filter(seminar=seminar)
        serializer = SeminarInscriptionSerializer(
            inscriptions, many=True, display=display)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """
        Retrieve a single SeminarInscription instance with optional display customization.

        Parameters:
            request (rest_framework.request.Request): The HTTP request.
            pk (str): The primary key of the SeminarInscription instance.

        Returns:
            rest_framework.response.Response: The serialized data.

        """

        display = request.query_params.get('display', 'false') == 'true'
        inscription = self.get_object()
        serializer = SeminarInscriptionSerializer(inscription, display=display)
        return Response(serializer.data)

    def create(self, request):
        """
        Create a new SeminarInscription instance.

        Parameters:
            request (rest_framework.request.Request): The HTTP request.

        Returns:
            rest_framework.response.Response: The serialized data or error messages.

        """

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            inscription = serializer.save()
            inscription.created_by = request.user
            inscription.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SeminarViewSet(viewsets.GenericViewSet):
    """
    ViewSet class for handling Seminar model instances.

    This ViewSet provides CRUD operations for Seminar objects and supports customization
    of serialized output based on the 'display' query parameter.

    Attributes:
        queryset (QuerySet): The set of Seminar instances.
        serializer_class (type): The serializer class for Seminar instances.

    Methods:
        list(request): Retrieve a list of Seminar instances with optional display customization.
        retrieve(request, pk=None): Retrieve a single Seminar instance with optional display customization.
        create(request): Create a new Seminar instance.
        update(request, pk=None): Update an existing Seminar instance.
        destroy(request, pk=None): Soft delete a Seminar instance.

    """

    queryset = Seminar.objects.all()
    serializer_class = SeminarSerializer

    def list(self, request):
        """
        Retrieve a list of Seminar instances with optional display customization.

        Parameters:
            request (rest_framework.request.Request): The HTTP request.

        Returns:
            rest_framework.response.Response: The serialized data.

        """

        display = request.query_params.get('display', 'false') == 'true'
        seminars = Seminar.objects.all()
        serializer = SeminarSerializer(seminars, many=True, display=display)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """
        Retrieve a single Seminar instance with optional display customization.

        Parameters:
            request (rest_framework.request.Request): The HTTP request.
            pk (str): The primary key of the Seminar instance.

        Returns:
            rest_framework.response.Response: The serialized data.

        """

        display = request.query_params.get('display', 'false') == 'true'
        seminar = self.get_object()
        serializer = SeminarSerializer(seminar, display=display)
        return Response(serializer.data)

    def create(self, request):
        """
        Create a new Seminar instance.

        Parameters:
            request (rest_framework.request.Request): The HTTP request.

        Returns:
            rest_framework.response.Response: The serialized data or error messages.

        """

        serializer = SeminarSerializer(data=request.data)
        if serializer.is_valid():
            seminar = serializer.save()
            seminar.created_by = request.user
            seminar.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        """
        Update an existing Seminar instance.

        Parameters:
            request (rest_framework.request.Request): The HTTP request.
            pk (str): The primary key of the Seminar instance.

        Returns:
            rest_framework.response.Response: The serialized data or error messages.

        """

        seminar = self.get_object()
        serializer = SeminarSerializer(seminar, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        """
        Partially update an existing Seminar instance.

        Parameters:
            request (rest_framework.request.Request): The HTTP request.
            pk (str): The primary key of the Seminar instance.

        Returns:
            rest_framework.response.Response: The serialized data or error messages.
        """

        seminar = self.get_object()
        serializer = SeminarSerializer(
            seminar, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """
        Soft delete a Seminar instance.

        Parameters:
            request (rest_framework.request.Request): The HTTP request.
            pk (str): The primary key of the Seminar instance.

        Returns:
            rest_framework.response.Response: The HTTP status code.

        """

        seminar = self.get_object()
        seminar.is_active = False
        seminar.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SeminarScheduleViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for SeminarSchedule instances.
    """
    queryset = SeminarSchedule.objects.all()
    serializer_class = SeminarScheduleSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        # Checks if the schedule is asociated to an active seminar
        if instance.seminar_set.filter(is_active=True).exists():
            return Response(
                {'detail': 'No se puede eliminar este horario, ya que está asociado a un seminario activo.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
