import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeminarListComponent } from './components/seminar-list/seminar-list.component';

const routes: Routes = [
  {path: '', component:SeminarListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemniarRoutingModule { }
