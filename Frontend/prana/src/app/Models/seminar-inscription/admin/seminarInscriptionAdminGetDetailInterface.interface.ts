export interface SeminarInscriptionAdminGetDetailInterface {
  id: number;
  seminar: string;
  patient: string;
  meetingNumber: number;
  seminar_status: string;
  insurance: string;
  patient_copayment: number;
  hi_copayment: number;
  payment_method: string | null;
  payment_status: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}
