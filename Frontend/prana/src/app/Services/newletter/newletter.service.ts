import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewletterService {
  private baseUrl: string = environment.api_Url+'newletter/subscribe/';
  constructor(private http: HttpClient) { }

  subscribe(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email });
    return this.http.post<any>(this.baseUrl, body, { headers });
  }
}
