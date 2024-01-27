import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patient } from 'src/app/Models/Profile/patient.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:8000/profile/admin/patient/';
  private currentPatientUrl = 'http://127.0.0.1:8000/profile/patient/';

  constructor(private httpClient: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.apiUrl)
  }

  /**
 * This function retrieves the current (logged) patient information.
 * @author Alvaro Olguin
 * @returns {Observable<Patient>} An Observable that contains the patient profile.
 */
  getCurrentPatient(): Observable<Patient> {
    return this.httpClient.get<Patient>(this.currentPatientUrl);
  }

  // Función para calcular el campo fullName a partir del campo user
  private calculateFullName(userId: number): string {
    // Lógica para calcular el nombre y apellido a partir del userId
    // Puedes implementar esta lógica según cómo estén estructurados los IDs
    // y los datos en tu aplicación.
    // Ejemplo:
    const firstName = 'John'; // Reemplaza con la lógica real
    const lastName = 'Doe';   // Reemplaza con la lógica real
    return `${firstName} ${lastName}`;
  }

  getPatientById(id: number): Observable<Patient> {
    const url = `${this.apiUrl}${id}/`;
    return this.httpClient.get<Patient>(url);
  }

  updatePatient(id: number, patientData: Patient): Observable<Patient> {
    const url = `${this.apiUrl}${id}/`;
    return this.httpClient.put<Patient>(url, patientData);
  }

  deletePatient(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.httpClient.delete<any>(url);
  }


  getPatientDetailsById(id: number): Observable<Patient> {
    const url = `${this.apiUrl}${id}/`;
    return this.httpClient.get<Patient>(url);
  }

}