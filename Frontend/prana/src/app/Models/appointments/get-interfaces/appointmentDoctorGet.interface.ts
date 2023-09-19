import { AppointmentPatientGetInterface } from "./appointmentPatientGet.interface";

export interface AppointmentDoctorGetInterface extends AppointmentPatientGetInterface {
  full_cost: number;
  payment_method: number;
}