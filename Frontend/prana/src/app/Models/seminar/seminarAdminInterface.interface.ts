export interface SeminarAdminInterface {
  id?: number;
  name: string;
  month: string;
  year: number;
  weekday: string;
  hour: string; // Formato 'HH:mm:ss'
  meetingNumber: number;
  maxInscription: number;
  price: number;
  is_active: boolean;
  seminarist: number[]; // Array de IDs de SeminaristProfile
  patients: number[]; // Array de IDs de PatientProfile
  rooms?: number[];
}
