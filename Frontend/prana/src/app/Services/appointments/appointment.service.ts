import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { UserShort } from 'src/app/Models/userShort.interface';
import { AppointmentAdminInterface } from 'src/app/Models/appointments/appointmentAdmin.interface';
import { AppointmentPatientInterface } from 'src/app/Models/appointments/appointmentPatient.interface';
import { AppointmentDoctorInterface } from 'src/app/Models/appointments/appointmentDoctor.interface';

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

  getDoctorAppointments(): Observable<AppointmentDoctorInterface[]> {
    // Get the access token and configure the headers
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return throwError('Usuario no autenticado');
    }
    // Check if the token is expired here
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<AppointmentDoctorInterface[]>(this.baseUrl + 'doctor/', { headers });
  }

  getPatientAppointments(): Observable<AppointmentPatientInterface[]> {
    // Get the access token and configure the headers
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return throwError('Usuario no autenticado');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<AppointmentPatientInterface[]>(this.baseUrl + 'patient/', { headers });
  }

}
