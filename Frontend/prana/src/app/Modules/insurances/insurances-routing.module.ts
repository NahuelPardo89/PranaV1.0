import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInsuranceComponent } from './componentes/insurance/list-insurance/list-insurance.component';
import { CreateInsuranceComponent } from './componentes/insurance/create-insurance/create-insurance.component';
import { EditInsuranceComponent } from './componentes/insurance/edit-insurance/edit-insurance.component';
import { ListInsurancePatientComponent } from './componentes/insurancePlanPratient/list-insurance-patient/list-insurance-patient.component';

const routes: Routes = [

  { 
    path: 'insurance', 
    children: [
      { path: '', component: ListInsuranceComponent },
      { path: 'create', component: CreateInsuranceComponent },
      { path: 'edit', component: EditInsuranceComponent },
    ]
  },
  { 
    path: 'patient', 
    children: [
      { path: '', component: ListInsurancePatientComponent },
      //{ path: 'create', component: CreateInsuranceComponent },
      //{ path: 'edit', component: EditInsuranceComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesRoutingModule { }
