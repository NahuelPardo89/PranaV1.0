import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/account/admin/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}${userId}/`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error al obtener el usuario', error);
        return throwError('Ocurrió un error al obtener el usuario.');
      })
    );
    
  }
}
