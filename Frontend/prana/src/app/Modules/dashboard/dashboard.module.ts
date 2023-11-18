import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { PatientComponent } from './patient/patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListarPacientesComponent } from './patient/listar-pacientes/listar-pacientes.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardNavComponent,
    DashboardBodyComponent,
    PatientComponent,
    ListarPacientesComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DashboardRoutingModule
    
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
