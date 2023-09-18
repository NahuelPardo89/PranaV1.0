import { AppointmentShortInterface } from "./appointmentShort.interface";

export interface AppointmentPatientInterface extends AppointmentShortInterface  {   
  specialty: number,
  branch: number,
  health_insurance: number,
  duration: string,
  state: number
  }