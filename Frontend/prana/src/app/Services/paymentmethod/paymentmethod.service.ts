import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethod } from 'src/app/Models/appointments/paymentmethod.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentmethodService {

  private baseUrl: string = 'http://127.0.0.1:8000/appointment/payment_method/'; // Assuming this URL based on the previous pattern

  constructor(private http: HttpClient) { }

  // Get all payment methods
  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(this.baseUrl);
  }

  // Get a specific payment method by ID
  getPaymentMethod(id: number): Observable<PaymentMethod> {
    return this.http.get<PaymentMethod>(`${this.baseUrl}${id}/`);
  }

  // Create a new payment method
  createPaymentMethod(data: PaymentMethod): Observable<PaymentMethod> {
    return this.http.post<PaymentMethod>(this.baseUrl, data);
  }

  // Update an existing payment method
  updatePaymentMethod(id: number, data: PaymentMethod): Observable<PaymentMethod> {
    return this.http.put<PaymentMethod>(`${this.baseUrl}${id}/`, data);
  }

  // Delete a payment method
  deletePaymentMethod(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }
}
