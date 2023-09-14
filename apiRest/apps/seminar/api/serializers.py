from datetime import datetime

from rest_framework import serializers

from apps.seminar.models import Room,SeminarRoomUsage, SeminarInscription,Seminar

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'capacity', 'cost', 'created_at', 'updated_at', 'created_by']
    
    

class SeminarRoomUsageSerializer(serializers.ModelSerializer):
    seminar = serializers.StringRelatedField()
    class Meta:
        model = SeminarRoomUsage
        fields = ['id', 'seminar', 'room', 'encountersCount']
    def validate_encountersCount(self, value):
        if value <= 0:
            raise serializers.ValidationError("El número de encuentros debe ser un valor positivo.")
        return value

class SeminarInscriptionSerializer(serializers.ModelSerializer):
    seminar = serializers.StringRelatedField()
    patient=serializers.StringRelatedField()
    class Meta:
        model = SeminarInscription
        fields = ['id', 'seminar', 'patient', 'meetingNumber', 'state', 'insurance',  'payment', 'created_at', 'updated_at', 'created_by']

class SeminarSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Seminar
        fields = [
            'id', 'name', 'month', 'year', 'weekday', 'hour', 'meetingNumber', 
            'rooms', 'maxInscription', 'price', 'is_active', 'seminarist', 'patients'
        ]
    
   
    
    
    def validate_year(self, value):
        current_year = datetime.now().year
        if value < 2000 or value > current_year + 10:
            raise serializers.ValidationError(f"El año debe estar entre 2000 y {current_year + 10}.")
        return value

    

    def validate_meetingNumber(self, value):
        if value <= 0:
            raise serializers.ValidationError("El número de reuniones debe ser un valor positivo.")
        return value

    def validate_maxInscription(self, value):
        if value < 0:
            raise serializers.ValidationError("El número máximo de inscripciones no puede ser negativo.")
        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser un valor positivo.")
        return value        