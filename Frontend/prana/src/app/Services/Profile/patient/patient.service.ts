import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patient } from 'src/app/Models/Profile/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:8000/profile/admin/patient/';

  constructor(private httpClient: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.apiUrl).pipe(
      map((patients: Patient[]) => {
        // Realiza la transformación para calcular el campo fullName
        return patients.map((patient) => ({
          ...patient,
          fullName: this.calculateFullName(patient.user)
        }));
      })
    );
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