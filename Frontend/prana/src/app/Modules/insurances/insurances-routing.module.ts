import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInsuranceComponent } from './componentes/insurance/list-insurance/list-insurance.component';
import { CreateInsuranceComponent } from './componentes/insurance/create-insurance/create-insurance.component';
import { EditInsuranceComponent } from './componentes/insurance/edit-insurance/edit-insurance.component';
import { ListInsurancePatientComponent } from './componentes/insurancePlanPratient/list-insurance-patient/list-insurance-patient.component';
import { CreateInsurancePatientComponent } from './componentes/insurancePlanPratient/create-insurance-patient/create-insurance-patient.component';
import { EditInsurancePatientComponent } from './componentes/insurancePlanPratient/edit-insurance-patient/edit-insurance-patient.component';

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
      { path: 'create', component: CreateInsurancePatientComponent },
      { path: 'edit', component: EditInsurancePatientComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesRoutingModule { }
