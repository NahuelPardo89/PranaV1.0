import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesRoutingModule } from './insurances-routing.module';
import { ListInsuranceComponent } from './componentes/list-insurance/list-insurance.component';
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
import { CreateInsuranceComponent } from './componentes/create-insurance/create-insurance.component';


@NgModule({
  declarations: [ListInsuranceComponent, CreateInsuranceComponent],
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
