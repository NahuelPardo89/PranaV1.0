import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethod } from 'src/app/Models/appointments/paymentmethod.interface';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewletterService {

  constructor() { }

  suscribeEmail(email: string){}
}
