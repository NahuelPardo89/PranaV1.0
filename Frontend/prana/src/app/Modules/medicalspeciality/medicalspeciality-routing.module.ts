import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListespecialityComponent } from './components/speciality/list-especiality/listespeciality.component';
import { CreateespecialityComponent } from './components/speciality/create-especiality/createespeciality.component';
import { EditEspecialityComponent } from './components/speciality/edit-especiality/edit-especiality.component';

const routes: Routes = [
  
  { 
    path: 'speciality', 
    children: [
      { path: '', component: ListespecialityComponent },
      { path: 'create', component: CreateespecialityComponent },
      { path: 'edit', component: EditEspecialityComponent }, //
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalspecialityRoutingModule { }
