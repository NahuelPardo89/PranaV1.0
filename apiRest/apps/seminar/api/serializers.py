from datetime import datetime

from rest_framework import serializers

from apps.seminar.models import Room,SeminarRoomUsage, SeminarInscription,Seminar
from apps.usersProfile.models import InsurancePlanSeminarist, HealthInsurance
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
    insurance = serializers.PrimaryKeyRelatedField(queryset=HealthInsurance.objects.all(), required=False, allow_null=True)
    class Meta:
        model = SeminarInscription
        fields = ['id', 'seminar', 'patient', 'meetingNumber', 'state','insurance',   'payment', 'created_at', 'updated_at', 'created_by']
    
    def validate(self, data):

        if 'insurance' in data and data['insurance'] is not None:
            return data
        # Accessing the insurances of the patient
        patient_insurances = set(data['patient'].insurances.all())
        print(patient_insurances)
        # Accessing the insurances of the seminarist associated with the seminar
        seminarist_insurances = set(data['seminar'].seminarist.first().insurances.all())
        print(seminarist_insurances)
        # Finding common insurances
        common_insurances = patient_insurances.intersection(seminarist_insurances)
        
        print("comunes",common_insurances)
        if not common_insurances:
            raise serializers.ValidationError("No common insurances found between patient and seminarist.")
        common_insurance_ids = {insurance.id for insurance in common_insurances}

        # Filtrando los planes de seguro del seminarista que están en los seguros comunes
        common_insurances_plans = InsurancePlanSeminarist.objects.filter(insurance__id__in=common_insurance_ids)

        # Encontrando el plan de seguro con la mayor cobertura
        highest_coverage_plan = max(common_insurances_plans, key=lambda plan: plan.coverage, default=None)

        if highest_coverage_plan is None:
            raise serializers.ValidationError("No valid insurance with coverage found.")

        # Asignando el ID del seguro con la mayor cobertura
        data['insurance'] = highest_coverage_plan.insurance
        print(data)
        return data
class SeminarSerializer(serializers.ModelSerializer):
    rooms=serializers.StringRelatedField(many=True)
    seminarist=serializers.StringRelatedField(many=True)
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