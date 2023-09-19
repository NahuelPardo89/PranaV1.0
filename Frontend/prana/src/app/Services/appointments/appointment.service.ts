import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { UserShort } from 'src/app/Models/user/userShort.interface';
import { AppointmentAdminInterface } from 'src/app/Models/appointments/appointmentAdmin.interface';
import { AppointmentPatientGetInterface } from 'src/app/Models/appointments/get-interfaces/appointmentPatientGet.interface';
import { AppointmentDoctorGetInterface } from 'src/app/Models/appointments/get-interfaces/appointmentDoctorGet.interface';
import { AppointmentPatientCreateInterface } from 'src/app/Models/appointments/create-interfaces/appointmentPatientCreate.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://127.0.0.1:8000/appointment/';
  private currentUserSubject: BehaviorSubject<UserShort | null> = new BehaviorSubject<UserShort | null>(null);
  public readonly currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  getAdminAppointments(): Observable<AppointmentAdminInterface[]> {
    return this.http.get<AppointmentAdminInterface[]>(this.baseUrl + 'admin/');
  }

  getDoctorAppointments(): Observable<AppointmentDoctorGetInterface[]> {
    return this.http.get<AppointmentDoctorGetInterface[]>(this.baseUrl + 'doctor/');
  }

  getPatientAppointments(): Observable<AppointmentPatientGetInterface[]> {
    return this.http.get<AppointmentPatientGetInterface[]>(this.baseUrl + 'patient/');
  }

  createAdminAppointment(appointment: AppointmentAdminInterface): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'admin/', appointment);
  }

  createDoctorAppointment(appointment: AppointmentDoctorGetInterface): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'doctor/', appointment);
  }

  createPatientAppointment(appointment: AppointmentPatientCreateInterface): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'patient/', appointment);
  }

}
