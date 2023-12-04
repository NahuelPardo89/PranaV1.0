import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './components/list-user/list-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';

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
      //          { path: 'edit', component: EditPatientComponent },
    ]
  },
  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
