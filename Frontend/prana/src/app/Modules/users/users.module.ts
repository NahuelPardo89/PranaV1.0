import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { CreateUserComponent } from './components/admin/user/create-user/create-user.component';
import { ListUserComponent } from './components/admin/user/list-user/list-user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';
import { PatientListComponent } from './components/admin/patient/patient-list/patient-list.component';
import { PatientEditComponent } from './components/admin/patient/patient-edit/patient-edit.component';
import { DoctorListComponent } from './components/admin/doctor/doctor-list/doctor-list.component';
import { DoctorEditComponent } from './components/admin/doctor/doctor-edit/doctor-edit.component';
import { DoctorCreateComponent } from './components/admin/doctor/doctor-create/doctor-create.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import {MatListModule} from '@angular/material/list';
import { EditmyuserComponent } from './components/myaccount/editmyuser/editmyuser.component';
import { EditmypatientComponent } from './components/myaccount/editmypatient/editmypatient.component';
import { EditmydoctorComponent } from './components/myaccount/editmydoctor/editmydoctor.component';
import { EditmypasswordComponent } from './components/myaccount/editmypassword/editmypassword.component';
@NgModule({
  declarations: [
   
    CreateUserComponent,
    ListUserComponent,
    EditUserComponent,
    PatientListComponent,
    PatientEditComponent,
    DoctorListComponent,
    DoctorEditComponent,
    DoctorCreateComponent,
    MyaccountComponent,
    EditmyuserComponent,
    EditmypatientComponent,
    EditmydoctorComponent,
    EditmypasswordComponent,
    
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    MatAutocompleteModule,
    MatListModule
  ]
})
export class UsersModule { }
