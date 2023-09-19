import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentAdminListComponent } from './components/admin/appointment-admin-list/appointment-admin-list.component';
import { AppointmentAdminDetailComponent } from './components/admin/appointment-admin-detail/appointment-admin-detail.component';
import { AppointmentAdminCreateComponent } from './components/admin/appointment-admin-create/appointment-admin-create.component';
import { AppointmentAdminUpdateComponent } from './components/admin/appointment-admin-update/appointment-admin-update.component';
import { AppointmentAdminDeleteComponent } from './components/admin/appointment-admin-delete/appointment-admin-delete.component';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';
import { AppointmentDoctorCreateComponent } from './components/doctor/appointment-doctor-create/appointment-doctor-create.component';
import { AppointmentDoctorDeleteComponent } from './components/doctor/appointment-doctor-delete/appointment-doctor-delete.component';
import { AppointmentDoctorDetailComponent } from './components/doctor/appointment-doctor-detail/appointment-doctor-detail.component';
import { AppointmentDoctorListComponent } from './components/doctor/appointment-doctor-list/appointment-doctor-list.component';
import { AppointmentDoctorUpdateComponent } from './components/doctor/appointment-doctor-update/appointment-doctor-update.component';
import { AppointmentPatientCreateComponent } from './components/patient/appointment-patient-create/appointment-patient-create.component';
import { AppointmentPatientDeleteComponent } from './components/patient/appointment-patient-delete/appointment-patient-delete.component';
import { AppointmentPatientDetailComponent } from './components/patient/appointment-patient-detail/appointment-patient-detail.component';
import { AppointmentPatientListComponent } from './components/patient/appointment-patient-list/appointment-patient-list.component';
import { AppointmentPatientUpdateComponent } from './components/patient/appointment-patient-update/appointment-patient-update.component';


@NgModule({
  declarations: [
    AppointmentAdminListComponent,
    AppointmentAdminDetailComponent,
    AppointmentAdminCreateComponent,
    AppointmentAdminUpdateComponent,
    AppointmentAdminDeleteComponent,
    AppointmentDoctorCreateComponent,
    AppointmentDoctorDeleteComponent,
    AppointmentDoctorDetailComponent,
    AppointmentDoctorListComponent,
    AppointmentDoctorUpdateComponent,
    AppointmentPatientCreateComponent,
    AppointmentPatientDeleteComponent,
    AppointmentPatientDetailComponent,
    AppointmentPatientListComponent,
    AppointmentPatientUpdateComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule
  ],
  providers: [AppointmentService]
})
export class AppointmentsModule { }
