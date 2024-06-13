from rest_framework import serializers
from apps.newletter.models import Newletter

class NewletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newletter
        fields = ['email']