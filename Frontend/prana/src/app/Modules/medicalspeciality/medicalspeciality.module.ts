import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalspecialityRoutingModule } from './medicalspeciality-routing.module';
import { ListespecialityComponent } from './components/listespeciality/listespeciality.component';
import { CreateespecialityComponent } from './components/createespeciality/createespeciality.component';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';


@NgModule({
  declarations: [
    ListespecialityComponent,
    CreateespecialityComponent
  ],
  imports: [
    CommonModule,
    MedicalspecialityRoutingModule
  ],
  providers: [SpecialityService]
})
export class MedicalspecialityModule { }
