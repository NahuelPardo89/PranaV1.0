import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentmthodRoutingModule } from './paymentmthod-routing.module';
import { PaymentmethodlistComponent } from './components/paymentmethodlist/paymentmethodlist.component';
import { PaymentmethodService } from 'src/app/Services/paymentmethod/paymentmethod.service';


@NgModule({
  declarations: [
    PaymentmethodlistComponent
  ],
  imports: [
    CommonModule,
    PaymentmthodRoutingModule
  ],
  providers: [PaymentmethodService]
})
export class PaymentmthodModule { }
