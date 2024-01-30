import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicalspeciality } from 'src/app/Models/Profile/medicalspeciality.interface';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  private baseUrl: string = 'http://127.0.0.1:8000/profile/admin/specialities/'; // Asume esta URL basándome en la estructura anterior
  private meUrl: string = 'http://127.0.0.1:8000/profile/me-speciality/';
  constructor(private http: HttpClient) { }

  // Get all medical specialities
  getSpecialities(): Observable<Medicalspeciality[]> {
    return this.http.get<Medicalspeciality[]>(this.baseUrl);
  }

  // Get a specific medical speciality by ID
  getSpeciality(id: number): Observable<Medicalspeciality> {
    return this.http.get<Medicalspeciality>(`${this.baseUrl}${id}/`);
  }

  // Create a new medical speciality
  createSpeciality(data: Medicalspeciality): Observable<Medicalspeciality> {
    return this.http.post<Medicalspeciality>(this.baseUrl, data);
  }

  // Update an existing medical speciality
  updateSpeciality(id: number, data: Medicalspeciality): Observable<Medicalspeciality> {
    return this.http.put<Medicalspeciality>(`${this.baseUrl}${id}/`, data);
  }

  // Delete a medical speciality
  deleteSpeciality(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }
  getMeSpecialities(): Observable<Medicalspeciality> {
    return this.http.get<Medicalspeciality>(this.meUrl);
  }
}
