import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './components/admin/user/list-user/list-user.component';
import { CreateUserComponent } from './components/admin/user/create-user/create-user.component';
import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';
import { PatientListComponent } from './components/admin/patient/patient-list/patient-list.component';
import { PatientEditComponent } from './components/admin/patient/patient-edit/patient-edit.component';
import { DoctorListComponent } from './components/admin/doctor/doctor-list/doctor-list.component';
import { DoctorEditComponent } from './components/admin/doctor/doctor-edit/doctor-edit.component';
import { DoctorCreateComponent } from './components/admin/doctor/doctor-create/doctor-create.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { EditmyuserComponent } from './components/myaccount/editmyuser/editmyuser.component';
import { EditmypasswordComponent } from './components/myaccount/editmypassword/editmypassword.component';
import { EditmypatientComponent } from './components/myaccount/editmypatient/editmypatient.component';
import { EditmydoctorComponent } from './components/myaccount/editmydoctor/editmydoctor.component';

const routes: Routes = [
  { 
    path: 'users', 
    children: [
      { path: '', component: ListUserComponent },
      { path: 'create', component: CreateUserComponent },
      { path: 'edit', component: EditUserComponent },
    ]
  },
  { 
    path: 'pacientes', 
    children: [
      { path: '', component: PatientListComponent },
      { path: 'edit', component: PatientEditComponent },
    ]
  },
  { 
    path: 'doctores', 
    children: [
      
      { path: '', component: DoctorListComponent },
      { path: 'create', component: DoctorCreateComponent },
      { path: 'edit', component: DoctorEditComponent },
    ]
  },
  { 
    path: 'myaccount', 
    children: [
      
      { path: '', component: MyaccountComponent },
      { path: 'edituser', component: EditmyuserComponent },
      { path: 'editpassword', component: EditmypasswordComponent },
      { path: 'editpatient', component: EditmypatientComponent },
      { path: 'editdoctor', component: EditmydoctorComponent },
    ]
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
