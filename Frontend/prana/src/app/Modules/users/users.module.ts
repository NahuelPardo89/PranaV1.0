import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
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
import { EditUserComponent } from './components/edit-user/edit-user.component';
@NgModule({
  declarations: [
   
    CreateUserComponent,
    ListUserComponent,
    EditUserComponent,
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
    MatIconModule
  ]
})
export class UsersModule { }