import { AppointmentPatientInterface } from "./appointmentPatient.interface";

export interface AppointmentDoctorInterface extends AppointmentPatientInterface  {   
  full_cost: number;
  paymenth_method: number;
  }