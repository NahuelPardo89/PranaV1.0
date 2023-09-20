import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route, Router } from '@angular/router';

import { BannerComponent } from './Modules/home/components/banner/banner.component';
import { TalleresComponent } from './Modules/workshops/components/talleres/talleres.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';

import { PageNotFoundComponent } from './Modules/shared/components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './Modules/dashboard/dashboard/dashboard.component';

const routes: Route[] = [
  { path: 'Home', component: BannerComponent },
  { path: 'Talleres', component: TalleresComponent },
  { path: 'AboutUs', component: QuienesSomosComponent },


  { path: 'Dashboard', component: DashboardComponent },

  { path: 'auth', loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'insurance', loadChildren: () => import('./Modules/healthinsurance/healthinsurance.module').then(m => m.HealthinsuranceModule) },
  { path: 'appointments', loadChildren: () => import('./Modules/appointments/appointments.module').then(m => m.AppointmentsModule) },
  { path: 'reports', loadChildren: () => import('./Modules/reports/reports.module').then(m => m.ReportsModule) },
  { path: 'doctors', loadChildren: () => import('./Modules/doctor-profile/doctor-profile.module').then(m => m.DoctorProfileModule) },
  { path: 'speciality', loadChildren: () => import('./Modules/medicalspeciality/medicalspeciality.module').then(m => m.MedicalspecialityModule) },
  { path: 'speciality/branch', loadChildren: () => import('./Modules/speciality-branch/speciality-branch.module').then(m => m.SpecialityBranchModule) },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.resetConfig(routes);
  }
}
