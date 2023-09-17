import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { JwtResponse } from 'src/app/Models/jwtResponse.interface' ;
import { LoginUser } from 'src/app/Models/loginUser.interface';
import { RegisterUser } from 'src/app/Models/registerUser.interface';
import { tap,catchError } from 'rxjs/operators'; 
import { BehaviorSubject } from 'rxjs';
import { UserShort } from 'src/app/Models/userShort.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/account/login/';
  private registerUrl = 'http://127.0.0.1:8000/account/singin/';
  private logoutUrl = 'http://127.0.0.1:8000/account/logout/';
  private refreshTokenUrl = 'http://127.0.0.1:8000/account/refresh/';

  private currentUserSubject: BehaviorSubject<UserShort | null> = new BehaviorSubject<UserShort | null>(null);
  public readonly currentUser = this.currentUserSubject.asObservable();

  
  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
  login(user: LoginUser): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, user).pipe(
      tap(response => {
        this.handleAuthentication(response);
      }),
      catchError(this.handleError)
    );
  }

  
 
  register(user: RegisterUser): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.registerUrl, user).pipe(
      tap(response => {
        this.handleAuthentication(response);
      }),
      catchError(this.handleError)
    );
  }

  logout(refreshToken: string): Observable<void> {
    return this.http.post<void>(this.logoutUrl, { refresh: refreshToken }).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      }),
      catchError(this.handleError)
    );
}
  refreshToken(): Observable<JwtResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      return this.http.post<JwtResponse>(this.refreshTokenUrl, { refresh: refreshToken }).pipe(
        tap((response: JwtResponse) => {
          localStorage.setItem('access_token', response.access);
        })
      );
    } else {
      return throwError('Refresh token no disponible');
    }
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Un error a ocurrido';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  private handleAuthentication(response: JwtResponse): void {
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    this.currentUserSubject.next(response.user);
  }
  getCurrentUser(): Observable<UserShort | null> {
    return this.currentUserSubject.asObservable();
  }
  
}
