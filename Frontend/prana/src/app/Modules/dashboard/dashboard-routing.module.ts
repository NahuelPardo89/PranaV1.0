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
import { AdminReportsComponent } from '../reports/components/admin-reports/admin-reports.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
       
      { path: 'insurance', loadChildren: () => import('src/app/Modules/healthinsurance/healthinsurance.module').then(m => m.HealthinsuranceModule) },
      { path: 'doctors', loadChildren: () => import('src/app/Modules/doctor-profile/doctor-profile.module').then(m => m. DoctorProfileModule) },
      { path: 'appointments', loadChildren: () => import('src/app/Modules/appointments/appointments.module').then(m => m.AppointmentsModule) },
      { path: 'appointments_doctor', loadChildren: () => import('src/app/Modules/appointments/appointments.module').then(m => m.AppointmentsModule) },
      { path: 'speciality', loadChildren: () => import('src/app/Modules/medicalspeciality/medicalspeciality.module').then(m => m. MedicalspecialityModule) },
      { path: 'speciality/branch', loadChildren: () => import('src/app/Modules/speciality-branch/speciality-branch.module').then(m => m. SpecialityBranchModule) },
      { path: 'patient', component: PatientComponent},
      { path: 'reports', component: AdminReportsComponent},
      { path: 'speciality/branch', loadChildren: () => import('src/app/Modules/speciality-branch/speciality-branch.module').then(m => m. SpecialityBranchModule) },
      // { path: 'reports', loadChildren: () => import('src/app/Modules/reports/reports.module').then(m => m. ReportsModule) },
  
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
