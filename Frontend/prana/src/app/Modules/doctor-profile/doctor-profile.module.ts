import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorProfileRoutingModule } from './doctor-profile-routing.module';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { ListDoctorProfileComponent } from './components/list-doctor-profile/list-doctor-profile.component';


@NgModule({
  declarations: [
    ListDoctorProfileComponent
  ],
  imports: [
    CommonModule,
    DoctorProfileRoutingModule
  ],
  providers: [DoctorprofileService]
})
export class DoctorProfileModule { }
