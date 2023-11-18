import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthinsuranceRoutingModule } from './healthinsurance-routing.module';
import { HealthinsuranceService } from 'src/app/Services/Profile/healthinsurance/healthinsurance.service';
import { HealthinsurancelistComponent } from './healthinsurancelist/healthinsurancelist.component';
import { HealthinsurancecreateComponent } from './healthinsurancecreate/healthinsurancecreate.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HealthinsurancelistComponent,
    HealthinsurancecreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HealthinsuranceRoutingModule
  ],
  providers: [HealthinsuranceService]
})
export class HealthinsuranceModule { }
