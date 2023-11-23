import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDoctorProfileComponent } from './components/list-doctor-profile/list-doctor-profile.component';
import { MeDoctorProfileComponent } from './components/me-doctor-profile/me-doctor-profile.component';

const routes: Routes = [
  { path: 'list', component:ListDoctorProfileComponent},
  { path: 'me', component:MeDoctorProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorProfileRoutingModule { }
