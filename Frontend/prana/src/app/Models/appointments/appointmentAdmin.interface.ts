import { AppointmentDoctorInterface } from "./appointmentDoctor.interface";

export interface AppointmentAdminInterface extends AppointmentDoctorInterface  {   
  patient_copayment: number;
  hi_copayment: number;
  }