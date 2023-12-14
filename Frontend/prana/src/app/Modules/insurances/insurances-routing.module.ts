import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInsuranceComponent } from './componentes/list-insurance/list-insurance.component';
import { CreateInsuranceComponent } from './componentes/create-insurance/create-insurance.component';
import { EditInsuranceComponent } from './componentes/edit-insurance/edit-insurance.component';

const routes: Routes = [

  { 
    path: 'insurance', 
    children: [
      { path: '', component: ListInsuranceComponent },
      { path: 'create', component: CreateInsuranceComponent },
      { path: 'edit', component: EditInsuranceComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesRoutingModule { }
