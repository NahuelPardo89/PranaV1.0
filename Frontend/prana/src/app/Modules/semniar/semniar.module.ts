import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SemniarRoutingModule } from './semniar-routing.module';
import { SeminarListComponent } from './components/seminar-list/seminar-list.component';
import { SeminarCreateComponent } from './components/seminar-create/seminar-create.component';
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


@NgModule({
  declarations: [
    SeminarListComponent,
    SeminarCreateComponent
  ],
  imports: [
    CommonModule,
    SemniarRoutingModule,
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
export class SemniarModule { }
