import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListespecialityComponent } from './components/speciality/list-especiality/listespeciality.component';

const routes: Routes = [
  
  { 
    path: 'speciality', 
    children: [
      { path: '', component: ListespecialityComponent },
      //{ path: 'create', component: CreateUserComponent },
      //{ path: 'edit', component: EditUserComponent },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalspecialityRoutingModule { }
