import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeminarAdminInterface } from 'src/app/Models/seminar/seminarAdminInterface.interface';

@Injectable({
  providedIn: 'root',
})
export class SeminarService {
  private apiUrl = 'http://127.0.0.1:8000/seminar/admin/seminars/'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  getSeminars(): Observable<SeminarAdminInterface[]> {
    return this.http.get<SeminarAdminInterface[]>(this.apiUrl);
  }

  getSeminarById(id: number): Observable<SeminarAdminInterface> {
    return this.http.get<SeminarAdminInterface>(`${this.apiUrl}${id}/`);
  }

  createSeminar(
    seminar: SeminarAdminInterface
  ): Observable<SeminarAdminInterface> {
    return this.http.post<SeminarAdminInterface>(this.apiUrl, seminar);
  }

  updateSeminar(
    id: number,
    seminar: SeminarAdminInterface
  ): Observable<SeminarAdminInterface> {
    return this.http.put<SeminarAdminInterface>(
      `${this.apiUrl}${id}/`,
      seminar
    );
  }

  deleteSeminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
