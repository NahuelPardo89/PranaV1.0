import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListespecialityComponent } from './components/listespeciality/listespeciality.component';

const routes: Routes = [
  { path: 'list', component:ListespecialityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalspecialityRoutingModule { }
