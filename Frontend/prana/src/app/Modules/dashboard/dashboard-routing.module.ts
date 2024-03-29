import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'insurances',
        loadChildren: () =>
          import('src/app/Modules/insurances/insurances.module').then(
            (m) => m.InsurancesModule
          ),
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('src/app/Modules/appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'appointments_doctor',
        loadChildren: () =>
          import('src/app/Modules/appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'speciality',
        loadChildren: () =>
          import(
            'src/app/Modules/medicalspeciality/medicalspeciality.module'
          ).then((m) => m.MedicalspecialityModule),
      },
      {
        path: 'speciality/branch',
        loadChildren: () =>
          import(
            'src/app/Modules/speciality-branch/speciality-branch.module'
          ).then((m) => m.SpecialityBranchModule),
      },
      {
        path: 'paymentmethod',
        loadChildren: () =>
          import('src/app/Modules/paymentmthod/paymentmthod.module').then(
            (m) => m.PaymentmthodModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('src/app/Modules/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('src/app/Modules/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'semniar',
        loadChildren: () =>
          import('src/app/Modules/semniar/semniar.module').then(
            (m) => m.SemniarModule
          ),
      },
      {
        path: 'seminar',
        loadChildren: () =>
          import('src/app/Modules/seminar/seminar.module').then(
            (m) => m.SeminarModule
          ),
      },
      {
        path: 'room',
        loadChildren: () =>
          import('src/app/Modules/room/room.module').then((m) => m.RoomModule),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('src/app/Modules/schedule/schedule.module').then(
            (m) => m.ScheduleModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
