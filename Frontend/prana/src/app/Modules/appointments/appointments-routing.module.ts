import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AppointmentListComponent } from './components/admin/appointment-list/appointment-list.component';
import { AppointmentDetailComponent } from './components/admin/appointment-detail/appointment-detail.component';
import { AppointmentCreateComponent } from './components/admin/appointment-create/appointment-create.component';
import { AppointmentUpdateComponent } from './components/admin/appointment-update/appointment-update.component';
import { AppointmentDeleteComponent } from './components/admin/appointment-delete/appointment-delete.component';

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
