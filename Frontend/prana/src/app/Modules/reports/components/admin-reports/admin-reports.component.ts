import { Component, OnInit } from '@angular/core';
import { ReportAppAdminPostInterface } from 'src/app/Models/reports/reportAppAdminPost.interface';
import { ReportAppAdminResponseInterface } from 'src/app/Models/reports/reportAppAdminResponse.interface';
import { ReportService } from 'src/app/Services/reports/report.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {
  reportData: ReportAppAdminResponseInterface;
  //body: ReportAppAdminPostInterface;
  //body = {}};

  constructor(private reportService: ReportService) {
    this.reportData = {
      doctor: 0,
      specialty: 0,
      branch: 0,
      payment_method: 0,
      num_patients: 0,
      num_appointments: 0,
      total_patient_copayment: 0,
      total_hi_copayment: 0
    };
    // this.body = {
    //   start_date: new Date("2023-09-01"),
    //   end_date: new Date("2023-09-30")
    // }
  }
  ngOnInit(): void {
    // this.reportService.getAdminAppointmentReport(body).subscribe((data: ReportAppAdminResponseInterface) => {
    //   this.reportData = data;
    //   console.log(data)
    // });
  }
}
