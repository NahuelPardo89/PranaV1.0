import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesRoutingModule } from './insurances-routing.module';
import { ListInsuranceComponent } from './componentes/insurance/list-insurance/list-insurance.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CreateInsuranceComponent } from './componentes/insurance/create-insurance/create-insurance.component';
import { EditInsuranceComponent } from './componentes/insurance/edit-insurance/edit-insurance.component';
import { ListInsurancePatientComponent } from './componentes/insurancePlanPratient/list-insurance-patient/list-insurance-patient.component';
import { CreateInsurancePatientComponent } from './componentes/insurancePlanPratient/create-insurance-patient/create-insurance-patient.component';
import { EditInsurancePatientComponent } from './componentes/insurancePlanPratient/edit-insurance-patient/edit-insurance-patient.component';


@NgModule({
  declarations: [ListInsuranceComponent, CreateInsuranceComponent, EditInsuranceComponent, ListInsurancePatientComponent, CreateInsurancePatientComponent, EditInsurancePatientComponent],
  imports: [
    CommonModule,
    InsurancesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule

  ]
})
export class InsurancesModule { }
