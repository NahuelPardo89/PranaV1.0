export interface SeminarInscription {
    seminar: number; // ID del seminario
    patient: number; // ID del perfil del paciente
    meetingNumber: number; // Número de la reunión
    state: number; // Estado de la inscripción
    insurance: number; // ID del seguro de salud
    payment: number | null; // ID del pago o null
  }