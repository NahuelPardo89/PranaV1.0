import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/Services/auth/auth.service';  
import { JwtResponse } from 'src/app/Models/jwtResponse.interface'; 
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthenticationToken(req)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Si recibimos una respuesta "Unauthorized", intentamos renovar el token
          return this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return request;
    }
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((tokenResponse: JwtResponse) => {
        localStorage.setItem('access_token', tokenResponse.access);
        return next.handle(this.addAuthenticationToken(request));
      }),
      catchError(error => {
        // Elimina los tokens y la información del usuario del localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        alert('Su sesión finalizo, debe volver a iniciar sesión');
        // Redirige al usuario al inicio de sesión
        this.router.navigate(['/login']);

        return throwError(error);
      })
    );
  }

}