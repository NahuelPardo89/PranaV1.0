import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { tap, catchError } from 'rxjs/operators';
import { HealthInsurance } from '../../../Models/Profile/healthinsurance.interface';




@Injectable({
  providedIn: 'root'
})
export class HealthinsuranceService {
  private url = 'http://127.0.0.1:8000/profile/admin/health-insurances/';
  constructor(private http: HttpClient) { }

  // Listar todas las HealthInsurances
  getAll(): Observable<HealthInsurance[]> {
    return this.http.get<HealthInsurance[]>(`${this.url}`);
  }

  // Obtener detalles de una HealthInsurance específica
  get(id: number): Observable<any> {
    return this.http.get(`${this.url}healthinsurances/${id}/`);
  }

  getDoctorPatientCommonHI(doctorId: number, patientId: number, branchId: number): Observable<HealthInsurance[]> {
    const url = 'http://127.0.0.1:8000/profile/admin/common-insurances/?';
    const doctor = 'doctor_id=' + doctorId;
    const patient = 'patient_id=' + patientId;
    const branch = 'branch_id=' + branchId;
    return this.http.get<HealthInsurance[]>(url + doctor + '&' + patient + '&' + branch);
  }

  // Crear una nueva HealthInsurance
  create(data: any): Observable<any> {
    return this.http.post(`${this.url}healthinsurances/`, data);
  }

  // Actualizar una HealthInsurance
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.url}healthinsurances/${id}/`, data);
  }

  // Eliminar una HealthInsurance
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}${id}/`);
  }


}
