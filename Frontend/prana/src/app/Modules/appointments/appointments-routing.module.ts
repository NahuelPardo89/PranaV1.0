import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';
import { AppointmentCreateComponent } from './components/appointment-create/appointment-create.component';
import { AppointmentUpdateComponent } from './components/appointment-update/appointment-update.component';
import { AppointmentDeleteComponent } from './components/appointment-delete/appointment-delete.component';

const routes: Routes = [
  {
  path: '',
  children: [
    { path: 'list', component: AppointmentListComponent },
    { path: 'list/id', component: AppointmentDetailComponent },
    { path: 'create', component: AppointmentCreateComponent },
    { path: 'update/:id', component: AppointmentUpdateComponent },
    { path: 'delete/:id', component: AppointmentDeleteComponent },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
