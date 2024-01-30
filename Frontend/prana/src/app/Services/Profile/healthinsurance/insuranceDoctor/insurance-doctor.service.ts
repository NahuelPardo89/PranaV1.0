import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsurancePlanDoctor } from 'src/app/Models/Profile/insurancePlanDoctor.interface';


@Injectable({
  providedIn: 'root'
})
export class InsuranceDoctorService {
  private url = 'http://127.0.0.1:8000/profile/admin/insurance-plans-doctor/';
  private meUrl = 'http://127.0.0.1:8000/profile/admin/me-insurance-plans-doctor/';
  constructor(private http: HttpClient) { }

  getAll(): Observable<InsurancePlanDoctor[]> {
    return this.http.get<InsurancePlanDoctor[]>(`${this.url}`);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}${id}/`);
  }
  // Crear una nueva HealthInsurance
  create(data:InsurancePlanDoctor): Observable<any> {
    return this.http.post(`${this.url}`, data);
  }
  update(id: number, data: InsurancePlanDoctor): Observable<any> {
    return this.http.put(`${this.url}${id}/`, data);
  }

  getMeDoctorInsurance(): Observable<InsurancePlanDoctor[]> {
    return this.http.get<InsurancePlanDoctor[]>(`${this.meUrl}`);
  }
  deleteMeDoctorInsurance(id: number): Observable<any>{
    return this.http.delete(`${this.meUrl}${id}/`);
  }
  // Crear una nueva HealthInsurance
  createMeDoctorInsurance(data:InsurancePlanDoctor): Observable<any> {
    return this.http.post(`${this.meUrl}`, data);
  }
  updateMeDoctorInsurance(id: number, data: InsurancePlanDoctor): Observable<any> {
    return this.http.patch(`${this.meUrl}${id}/`, data);
  }
}
