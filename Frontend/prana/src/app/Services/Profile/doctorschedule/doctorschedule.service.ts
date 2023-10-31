import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorScheduleInterface } from 'src/app/Models/Profile/doctorschedule.interface';

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
    console.log("Adentrini del service, el doctor es: ", doctor_id);
    const url = this.baseUrl + '?doctor_id=' + doctor_id;
    console.log("Adentrini del service, endpoint es: ", url)
    return this.http.get<DoctorScheduleInterface[]>(url)
  }

}
