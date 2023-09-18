import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';
import { AppointmentCreateComponent } from './components/appointment-create/appointment-create.component';
import { AppointmentUpdateComponent } from './components/appointment-update/appointment-update.component';
import { AppointmentDeleteComponent } from './components/appointment-delete/appointment-delete.component';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';


@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentDetailComponent,
    AppointmentCreateComponent,
    AppointmentUpdateComponent,
    AppointmentDeleteComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule
  ],
  providers: [AppointmentService]
})
export class AppointmentsModule { }
