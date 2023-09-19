import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminReportsComponent } from './components/admin-reports/admin-reports.component';
import { DoctorReportsComponent } from './components/doctor-reports/doctor-reports.component';

const routes: Routes = [
  {
    path: 'copayment',
    children: [
      {
        path: 'appointment',
        children: [
          {
            path: 'admin',
            children: [{ path: 'list', component: AdminReportsComponent }],
          },
          {
            path: 'doctor',
            children: [{ path: 'list', component: DoctorReportsComponent }],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
