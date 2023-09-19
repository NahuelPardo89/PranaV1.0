import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PatientComponent } from './patient/patient.component';
import { ListDoctorProfileComponent } from '../doctor-profile/components/list-doctor-profile/list-doctor-profile.component';

import { HealthinsurancelistComponent } from '../healthinsurance/healthinsurancelist/healthinsurancelist.component';

import { AppointmentAdminListComponent } from '../appointments/components/admin/appointment-admin-list/appointment-admin-list.component';
import { AppointmentDoctorListComponent } from '../appointments/components/doctor/appointment-doctor-list/appointment-doctor-list.component';
import { AppointmentPatientListComponent } from '../appointments/components/patient/appointment-patient-list/appointment-patient-list.component';



const routes: Routes = [
  {
    path: 'Dashboard',
    component: DashboardComponent,
    children: [
      // { path: 'usuarios', component:  },
      { path: 'patient', component: PatientComponent },
      { path: 'doctor', component:  ListDoctorProfileComponent  },
      { path: 'healt_insurance', component: HealthinsurancelistComponent },
      { path: 'appointment_admin', component: AppointmentAdminListComponent},
      { path: 'appointment_doctor', component: AppointmentDoctorListComponent},
      { path: 'appointment_patient', component: AppointmentPatientListComponent},
      
      // { path: 'workshops', component:    },
      // { path: 'account', component:    },
      
      // Agrega más rutas según tus necesidades
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta por defecto
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
  
  }
