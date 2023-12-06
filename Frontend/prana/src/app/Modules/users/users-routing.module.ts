import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './components/list-user/list-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientEditComponent } from './components/patient-edit/patient-edit.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorEditComponent } from './components/doctor-edit/doctor-edit.component';
import { DoctorCreateComponent } from './components/doctor-create/doctor-create.component';

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
      // Aquí irían las rutas relacionadas con los pacientes
      { path: '', component: PatientListComponent },
      //          { path: 'create', component: CreatePatientComponent },
      { path: 'edit', component: PatientEditComponent },
    ]
  },
  { 
    path: 'doctores', 
    children: [
      // Aquí irían las rutas relacionadas con los pacientes
      { path: '', component: DoctorListComponent },
      { path: 'create', component: DoctorCreateComponent },
      { path: 'edit', component: DoctorEditComponent },
    ]
  },
  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
