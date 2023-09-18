import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardNavComponent,
    DashboardBodyComponent
  ],
  imports: [
    CommonModule,
    
    
  ]
})
export class DashboardModule { }
