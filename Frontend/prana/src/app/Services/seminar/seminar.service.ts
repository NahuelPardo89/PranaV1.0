import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seminar } from 'src/app/Models/seminar/seminar.interface';


@Injectable({
  providedIn: 'root'
})
export class SeminarService {
  private apiUrl = 'http://127.0.0.1:8000/seminar/admin/seminars/'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  getSeminars(): Observable<Seminar[]> {
    
    return this.http.get<Seminar[]>(this.apiUrl);
  }

  getSeminarById(id: number): Observable<Seminar> {
    return this.http.get<Seminar>(`${this.apiUrl}${id}/`);
  }

  createSeminar(seminar: Seminar): Observable<Seminar> {
    return this.http.post<Seminar>(this.apiUrl, seminar);
  }

  updateSeminar(id: number, seminar: Seminar): Observable<Seminar> {
    return this.http.put<Seminar>(`${this.apiUrl}${id}/`, seminar);
  }

  deleteSeminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}