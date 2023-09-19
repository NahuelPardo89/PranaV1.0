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
    path: '', component: DashboardComponent,
    children: [
       // Redirige a una ruta por defecto si lo deseas
      { path: 'insurance', loadChildren: () => import('src/app/Modules/healthinsurance/healthinsurance.module').then(m => m.HealthinsuranceModule) },
     
      // ... otras rutas hijas ...
    ]
  }
];

//const routes: Routes = [
 // {path: '', component: DashboardComponent},
  //{ path: 'insurance', loadChildren: () => import('src/app/Modules/healthinsurance/healthinsurance.module').then(m => m.HealthinsuranceModule) }
//];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
  
  }
