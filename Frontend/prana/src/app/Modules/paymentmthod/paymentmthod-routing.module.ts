import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentmethodlistComponent } from './components/paymentmethodlist/paymentmethodlist.component';

const routes: Routes = [
  {path: 'list', component:PaymentmethodlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentmthodRoutingModule { }
