import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [  
    PageNotFoundComponent,
    NavbarComponent,
    DialogBoxComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
    
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [    
    AuthService,    
  ],
})
export class SharedModule { }
