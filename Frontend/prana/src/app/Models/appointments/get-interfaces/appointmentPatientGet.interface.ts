export interface AppointmentPatientGetInterface {
  id:number,
  day: Date,
  hour: string,
  doctor: number,
  patient: number,
  specialty: number,
  branch: number,
  health_insurance: number,
  duration: string,
  state: number
}