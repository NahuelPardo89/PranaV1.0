import { AppointmentAdminGetInterface } from "../appointments/appointmentAdmin.interface"

export interface ReportAppAdminResponseInterface {
    summary: {
        doctor: number,
        specialty: number,
        branch: number,
        payment_method: number,
        num_patients: number,
        num_appointments: number,
        total_patient_copayment: number,
        total_hi_copayment: number
    },
    appointments: AppointmentAdminGetInterface[]
}