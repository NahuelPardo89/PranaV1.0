import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { User } from 'src/app/Models/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/account/admin/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.apiUrl}${userId}/`;
    return this.http.get<User>(url).pipe(
      catchError(error => {
        return throwError(() => new Error(error));
      })
    );

  }

  createUser(user: User): Observable<void> {
    ; // Ajusta esta URL según la API
    return this.http.post<void>(this.apiUrl, user).pipe(
      catchError(error => {

        return throwError(() => new Error(error));
      })
    );
  }

  updateUser(userId: number, userData: User): Observable<void> {
    const url = `${this.apiUrl}${userId}/`;
    return this.http.put<void>(url, userData).pipe(
      catchError(error => {
        return throwError(() => new Error(error));
      })
    );
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiUrl}${userId}/`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        return throwError(() => new Error(error));
      })
    );
  }
}
