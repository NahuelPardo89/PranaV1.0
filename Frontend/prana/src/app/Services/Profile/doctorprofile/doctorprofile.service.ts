import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { ReportAppDoctorResponseInterface } from 'src/app/Models/reports/reportAppDoctorResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorprofileService {
  private baseUrl: string = 'http://127.0.0.1:8000/profile/admin/doctor/';
  private meUrl: string = 'http://127.0.0.1:8000/profile/doctor/';
  private doctorReportUrl: string = 'http://127.0.0.1:8000/profile/admin/doctor-report-data/';

  constructor(private http: HttpClient) { }

  getMyDoctorProfile(): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile>(this.meUrl);
  }

  /**
 * This function retrieves the doctor's report profile.
 * @author Alvaro Olguin
 * @returns {Observable<ReportAppDoctorResponseInterface>} An Observable that contains the doctor's report profile.
 */
  getMyDoctorReportProfile(): Observable<ReportAppDoctorResponseInterface> {
    return this.http.get<ReportAppDoctorResponseInterface>(this.doctorReportUrl);
  }

  // Actualizar el perfil del doctor autenticado
  updateMyDoctorProfile(data: DoctorProfile): Observable<DoctorProfile> {
    return this.http.put<DoctorProfile>(this.meUrl, data);
  }
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
  partialupdateDoctor(doctorId: number, data: Partial<DoctorProfile>): Observable<any> {
    return this.http.patch(`${this.baseUrl}${doctorId}/`, data);
  }
  // Delete a doctor profile
  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }

}