export interface InsurancePlanPatient {
    patientId: number; // ID del paciente (referencia a PatientProfile)
    insuranceId: number; // ID de la mutual (referencia a HealthInsurance)
    code: string | null; // Código, puede ser nulo o una cadena
  }