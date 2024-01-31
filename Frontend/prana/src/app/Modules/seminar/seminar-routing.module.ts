import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeminarAdminCreateComponent } from './components/admin/seminar-admin-create/seminar-admin-create.component';
import { SeminarAdminListComponent } from './components/admin/seminar-admin-list/seminar-admin-list.component';
import { SeminarPatientListComponent } from './components/patient/seminar-patient-list/seminar-patient-list.component';
import { SeminarAdminUpdateComponent } from './components/admin/seminar-admin-update/seminar-admin-update.component';
import { SeminarInscriptionAdminListComponent } from './components/admin/seminar-inscription-admin-list/seminar-inscription-admin-list.component';
import { SeminarInscriptionAdminCreateComponent } from './components/admin/seminar-inscription-admin-create/seminar-inscription-admin-create.component';
import { SeminarInscriptionAdminUpdateComponent } from './components/admin/seminar-inscription-admin-update/seminar-inscription-admin-update.component';
import { SeminarInscriptionPatientListComponent } from './components/patient/seminar-inscription-patient-list/seminar-inscription-patient-list.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: 'create', component: SeminarAdminCreateComponent },
      { path: 'list', component: SeminarAdminListComponent },
      { path: 'update', component: SeminarAdminUpdateComponent },
      {
        path: 'seminar-inscription',
        children: [
          { path: 'list', component: SeminarInscriptionAdminListComponent },
          { path: 'create', component: SeminarInscriptionAdminCreateComponent },
          { path: 'update', component: SeminarInscriptionAdminUpdateComponent },
        ],
      },
    ],
  },
  {
    path: 'doctor',
    children: [],
  },
  {
    path: 'patient',
    children: [
      { path: 'list', component: SeminarPatientListComponent },
      {
        path: 'seminar-inscription',
        children: [
          { path: 'list', component: SeminarInscriptionPatientListComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeminarRoutingModule {}
