import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { AdminReportsComponent } from './components/admin-reports/admin-reports.component';
import { DoctorReportsComponent } from './components/doctor-reports/doctor-reports.component';
import { ReportService } from 'src/app/Services/reports/report.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminReportsComponent,
    DoctorReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ReportService]
})
export class ReportsModule { }
