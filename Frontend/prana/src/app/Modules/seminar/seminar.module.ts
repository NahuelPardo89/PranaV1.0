import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeminarRoutingModule } from './seminar-routing.module';
import { SeminarAdminCreateComponent } from './components/admin/seminar-admin-create/seminar-admin-create.component';
import { SeminarAdminListComponent } from './components/admin/seminar-admin-list/seminar-admin-list.component';
import { SeminarPatientListComponent } from './components/patient/seminar-patient-list/seminar-patient-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SeminarAdminUpdateComponent } from './components/admin/seminar-admin-update/seminar-admin-update.component';

@NgModule({
  declarations: [
    SeminarAdminCreateComponent,
    SeminarPatientListComponent,
    SeminarAdminListComponent,
    SeminarAdminUpdateComponent,
  ],
  imports: [
    CommonModule,
    SeminarRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
})
export class SeminarModule {}
