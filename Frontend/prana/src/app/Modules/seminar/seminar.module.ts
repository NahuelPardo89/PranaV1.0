import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeminarRoutingModule } from './seminar-routing.module';
import { SeminarAdminCreateComponent } from './components/admin/seminar-admin-create/seminar-admin-create.component';
import { SeminarPatientListComponent } from './components/patient/seminar-patient-list/seminar-patient-list.component';

@NgModule({
  declarations: [SeminarAdminCreateComponent, SeminarPatientListComponent],
  imports: [CommonModule, SeminarRoutingModule],
})
export class SeminarModule {}
