import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListespecialityComponent } from './components/speciality/list-especiality/listespeciality.component';
import { CreateespecialityComponent } from './components/speciality/create-especiality/createespeciality.component';
import { EditEspecialityComponent } from './components/speciality/edit-especiality/edit-especiality.component';
import { ListSpecialityBranchComponent } from './components/specialityBranch/list-speciality-branch/list-speciality-branch.component';
import { CreateSpecialityBranchComponent } from './components/specialityBranch/create-speciality-branch/create-speciality-branch.component';
import { EditSpecialityBranchComponent } from './components/specialityBranch/edit-speciality-branch/edit-speciality-branch.component';

const routes: Routes = [
  
  { 
    path: 'speciality', 
    children: [
      { path: '', component: ListespecialityComponent },
      { path: 'create', component: CreateespecialityComponent },
      { path: 'edit', component: EditEspecialityComponent }, //
    ]
  },
  { 
    path: 'branch', 
    children: [
      { path: '', component: ListSpecialityBranchComponent },
      { path: 'create', component: CreateSpecialityBranchComponent },
      { path: 'edit', component: EditSpecialityBranchComponent }, //
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalspecialityRoutingModule { }
