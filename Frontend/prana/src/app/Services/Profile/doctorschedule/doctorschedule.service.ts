import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorScheduleInterface } from 'src/app/Models/Profile/doctorschedule.interface';
import { DoctorAvailableTimes } from 'src/app/Models/appointments/doctor-availables-times/appointmentAdmin.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorscheduleService {

  private baseUrl: string = 'http://127.0.0.1:8000/profile/admin/doctor-schedules/';

  constructor(private http: HttpClient) { }

  // Get the list of all doctor's schedules 
  getAllDoctorsSchedules(): Observable<DoctorScheduleInterface[]> {
    return this.http.get<DoctorScheduleInterface[]>(this.baseUrl)
  }

  // Get a list with the doctor schedule 
  getDoctorSchedule(doctor_id: number): Observable<DoctorScheduleInterface[]> {
    console.log("Adento del service, el doctor es: ", doctor_id);
    const url = this.baseUrl + '?doctor_id=' + doctor_id;
    console.log("Adentro del service, endpoint es: ", url)
    return this.http.get<DoctorScheduleInterface[]>(url)
  }

  // Get a list with the availables times of a doctor  
  getDoctorAvailableTime(doctor_id: number, day: string | null): Observable<DoctorAvailableTimes> {
    const url = `http://127.0.0.1:8000/profile/admin/doctor-available-times/${doctor_id}/${day}/`;
    console.log("Adentro del service Available Times, endpoint es: ", url)
    return this.http.get<DoctorAvailableTimes>(url)
  }

}
