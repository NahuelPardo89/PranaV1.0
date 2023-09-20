import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/Models/Profile/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:8000/profile/admin/patient/';

  constructor(private httpClient: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.apiUrl);
  }

  getPatientById(id: number): Observable<Patient> {
    const url = `${this.apiUrl}${id}/`;
    return this.httpClient.get<Patient>(url);
  }

  createPatient(patientData: Patient): Observable<Patient> {
    return this.httpClient.post<Patient>(this.apiUrl, patientData);
  }

  updatePatient(id: number, patientData: Patient): Observable<Patient> {
    const url = `${this.apiUrl}${id}/`;
    return this.httpClient.put<Patient>(url, patientData);
  }

  deletePatient(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.httpClient.delete<any>(url);
  }
}