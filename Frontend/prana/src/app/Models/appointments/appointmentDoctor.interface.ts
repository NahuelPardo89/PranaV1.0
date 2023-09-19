import { AppointmentPatientInterface } from "./appointmentPatient.interface";

export interface AppointmentDoctorInterface extends AppointmentPatientInterface  {   
  full_cost: number;
  payment_method: number;
  }