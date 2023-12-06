import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorProfileRoutingModule } from './doctor-profile-routing.module';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { ListDoctorProfileComponent } from './components/list-doctor-profile/list-doctor-profile.component';
import { CreateDoctorComponent } from './components/create-doctor/create-doctor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MeDoctorProfileComponent } from './components/me-doctor-profile/me-doctor-profile.component';


@NgModule({
  declarations: [
    ListDoctorProfileComponent,
    MeDoctorProfileComponent,
    CreateDoctorComponent
  ],
  imports: [
    CommonModule,
    DoctorProfileRoutingModule,
    ReactiveFormsModule,
    
  ],
  providers: [DoctorprofileService]
})
export class DoctorProfileModule { }