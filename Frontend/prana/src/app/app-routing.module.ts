import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route, Router } from '@angular/router';

import { BannerComponent } from './Modules/home/components/banner/banner.component';
import { TalleresComponent } from './Modules/workshops/components/talleres/talleres.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';

import { PageNotFoundComponent } from './Modules/shared/components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './Modules/dashboard/dashboard/dashboard.component';

const routes: Route[] = [
  { path: 'home', component: BannerComponent },
  { path: 'talleres', component: TalleresComponent },
  { path: 'aboutus', component: QuienesSomosComponent },
  { path: 'dashboard', loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'auth', loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule) },
  
  
  
  //{ path: '**', component: PageNotFoundComponent },

 
  
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
