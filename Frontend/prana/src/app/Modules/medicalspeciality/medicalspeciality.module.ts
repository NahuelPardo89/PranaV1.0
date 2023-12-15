import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalspecialityRoutingModule } from './medicalspeciality-routing.module';
import { ListespecialityComponent } from './components/speciality/list-especiality/listespeciality.component';
import { CreateespecialityComponent } from './components/speciality/create-especiality/createespeciality.component';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EditEspecialityComponent } from './components/speciality/edit-especiality/edit-especiality.component';


@NgModule({
  declarations: [
    ListespecialityComponent,
    CreateespecialityComponent,
    EditEspecialityComponent
  ],
  imports: [
    CommonModule,
    MedicalspecialityRoutingModule,
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
  ],
  providers: [SpecialityService]
})
export class MedicalspecialityModule { }
