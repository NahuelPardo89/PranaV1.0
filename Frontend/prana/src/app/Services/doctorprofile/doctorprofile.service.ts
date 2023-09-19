import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorProfile } from 'src/app/Models/doctorprofile.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorprofileService {
  private baseUrl: string = 'http://127.0.0.1:8000/profile/admin/doctor/';

  constructor(private http: HttpClient) { }

  // Get all doctor profiles
  getDoctors(): Observable<DoctorProfile[]> {
    return this.http.get<DoctorProfile[]>(this.baseUrl);
  }

  // Get a specific doctor profile by ID
  getDoctor(id: number): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile>(`${this.baseUrl}${id}/`);
  }

  // Create a new doctor profile
  createDoctor(data: DoctorProfile): Observable<DoctorProfile> {
    return this.http.post<DoctorProfile>(this.baseUrl, data);
  }

  // Update an existing doctor profile
  updateDoctor(id: number, data: DoctorProfile): Observable<DoctorProfile> {
    return this.http.put<DoctorProfile>(`${this.baseUrl}${id}/`, data);
  }

  // Delete a doctor profile
  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }
}