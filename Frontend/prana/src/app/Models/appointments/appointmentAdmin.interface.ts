import { AppointmentDoctorGetInterface } from "./get-interfaces/appointmentDoctorGet.interface";

export interface AppointmentAdminInterface extends AppointmentDoctorGetInterface {
  patient_copayment: number;
  hi_copayment: number;
}