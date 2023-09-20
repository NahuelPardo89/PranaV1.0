import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialityBranchListComponent } from './components/speciality-branch-list/speciality-branch-list.component';

const routes: Routes = [
  {path: 'list', component:SpecialityBranchListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialityBranchRoutingModule { }
