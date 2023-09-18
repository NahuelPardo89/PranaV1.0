import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route, Router } from '@angular/router';

import { BannerComponent } from './Modules/home/components/banner/banner.component';
import { TalleresComponent } from './Modules/workshops/components/talleres/talleres.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { LoginComponent } from './Modules/login/components/login/login.component';
import { RegisterComponent } from './Modules/login/components/register/register.component';
import { PageNotFoundComponent } from './Modules/shared/components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './Modules/dashboard/dashboard/dashboard.component';

const routes: Route[] = [
  { path: 'Home', component: BannerComponent },
  { path: 'Talleres', component: TalleresComponent },
  { path: 'AboutUs', component: QuienesSomosComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Registro', component: RegisterComponent },
  { path: 'Dashboard', component: DashboardComponent },
  
  {path: 'auth',loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule)},
  {path: 'appointments',loadChildren: () => import('./Modules/appointments/appointments.module').then(m => m.AppointmentsModule)},
  
  
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
