import { AppointmentPatientCreateInterface } from './appointmentPatientCreate.interface';

export interface AppointmentDoctorCreateInterface
  extends AppointmentPatientCreateInterface {
  duration?: string;
  branch?: number;
  state?: number;
  payment_method?: number;
  appointment_status?: number;
  payment_status?: number;
}
