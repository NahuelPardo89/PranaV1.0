import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { AdminReportsComponent } from './components/admin-reports/admin-reports.component';
import { DoctorReportsComponent } from './components/doctor-reports/doctor-reports.component';
import { ReportService } from 'src/app/Services/reports/report.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';
import { BranchService } from 'src/app/Services/Profile/branch/branch.service';
import { MatSelectModule } from '@angular/material/select';
import { PaymentmethodService } from 'src/app/Services/paymentmethod/paymentmethod.service';
import { PatientService } from 'src/app/Services/Profile/patient/patient.service';
import { HealthinsuranceService } from 'src/app/Services/Profile/healthinsurance/insurance/healthinsurance.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SpecialtyFilterService } from 'src/app/Services/Profile/speciality/specialty-filter/specialty-filter.service';


@NgModule({
  declarations: [
    AdminReportsComponent,
    DoctorReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  providers: [
    ReportService,
    DoctorprofileService,
    SpecialityService,
    BranchService,
    PatientService,
    HealthinsuranceService,
    SpecialtyFilterService,
    PaymentmethodService,
  ]
})
export class ReportsModule { }
