import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthinsurancelistComponent } from './healthinsurancelist/healthinsurancelist.component';

const routes: Routes = [
  {
    path:'list', component:HealthinsurancelistComponent
  },
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthinsuranceRoutingModule { }
