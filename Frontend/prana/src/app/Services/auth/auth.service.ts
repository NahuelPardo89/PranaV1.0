import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { JwtResponse } from 'src/app/Models/user/jwtResponse.interface' ;
import { LoginUser } from 'src/app/Models/user/loginUser.interface';
import { RegisterUser } from 'src/app/Models/user/registerUser.interface';
import { tap,catchError } from 'rxjs/operators'; 
import { BehaviorSubject } from 'rxjs';
import { UserShort } from 'src/app/Models/user/userShort.interface';

import { Router } from '@angular/router';

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

  
  constructor(private http: HttpClient,private router: Router) {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
  
  
  login(user: LoginUser): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, user).pipe(
      tap(response => {
        this.handleUser(response);
        this.handleTokens(response);
        this.handleRoles(response.roles); // Maneja los roles
      }),
      catchError(error => this.handleError(error, 'Error al iniciar sesión'))
    );
  }



 
  
 
  register(user: RegisterUser): Observable<HttpResponse<JwtResponse>> {
    return this.http.post<JwtResponse>(this.registerUrl, user, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status === 201) {
            this.router.navigate(['/auth/login']);
          }
        }),
        catchError(error => this.handleError(error, 'Error al registrarse'))
      );
  }
  
  
  logout(): Observable<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      // Si no hay token de refresco, procedemos con la limpieza del cliente directamente
      this.clearLocalStorage();
      return throwError(() => new Error('No refresh token'));
    }
    return this.http.post<void>(this.logoutUrl, { refresh: refreshToken }).pipe(
      tap(() => this.clearLocalStorage()),
      catchError((error) => {
        // Incluso si hay un error, limpiamos el cliente
        this.clearLocalStorage();
        // Puedes decidir si quieres manejar este error de alguna manera específica
        return throwError(() => new Error('Token de refresco ha expirado'));
      })
    );
  }
 

  refreshToken(): Observable<HttpResponse<JwtResponse>> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('Refresh token no disponible'));
    }
  
    return this.http.post<JwtResponse>(this.refreshTokenUrl, { refresh: refreshToken }, { observe: 'response' }).pipe(
      tap(response => {
        if (response.status === 200 && response.body) {
          this.handleTokens(response.body);
        } else {
          this.clearLocalStorage();
        }
      }),
      catchError((error) => {
        // Incluso si hay un error, limpiamos el cliente
        this.clearLocalStorage();
        // Puedes decidir si quieres manejar este error de alguna manera específica
        return throwError(() =>  new Error('Refresh token ha expirado'));
      })
      
    );
  }




  private handleRoles(roles: string[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  
  private handleError(error: HttpErrorResponse, defaultMessage: string): Observable<never> {
    // Proporciona un manejo de errores más específico según cada método
    const errorMessage = error.error instanceof ErrorEvent
      ? `Error del lado del cliente: ${error.error.message}`
      : `Error del servidor: ${error.message}`;
    console.error(errorMessage);
    return throwError(() => new Error(defaultMessage));
  }
  
  private handleUser(response: JwtResponse): void {
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private handleTokens(response: JwtResponse): void {
    
    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    
  }

  getCurrentUser(): Observable<UserShort | null> {
    return this.currentUserSubject.asObservable();
  }
  
  clearLocalStorage(): void {
    console.log("Clear local storage");
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }
  
}
