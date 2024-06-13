from rest_framework import viewsets
from apps.newletter.models import Newletter
from .serializers import NewletterSerializer

# Create your views here.
class NewletterViewSet(viewsets.ModelViewSet):
    queryset = Newletter.objects.all()
    serializer_class = NewletterSerializer