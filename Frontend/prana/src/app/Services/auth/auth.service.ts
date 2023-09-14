import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { JwtResponse } from 'src/app/Models/jwtResponse.interface' ;
import { LoginUser } from 'src/app/Models/loginUser.interface';
import { RegisterUser } from 'src/app/Models/registerUser.interface';
import { tap } from 'rxjs/operators'; 
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/Models/user.interface';
import { UserShort } from 'src/app/Models/userShort.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/account/login/';
  private registerUrl = '';
  private logoutUrl = '';
  private refreshTokenUrl = '';

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
      })
    );
  }
  
 
  register(user: RegisterUser): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.registerUrl, user).pipe(
      tap(response => {
        this.handleAuthentication(response);
      })
    );
  }

  logout(refreshToken: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.post<void>(this.logoutUrl, { refresh: refreshToken }, { headers: headers }).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      })
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
      return throwError('Refresh token not available');
    }
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
