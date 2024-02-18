import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportAppAdminPostInterface } from 'src/app/Models/reports/reportAppAdminPost.interface';
import { ReportAppAdminResponseInterface } from 'src/app/Models/reports/reportAppAdminResponse.interface';
import { environment } from 'src/enviroments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private appointmentReportBaseUrl = environment.api_Url+'report/copayment/appointment/';
  // not implemented yet
  private seminarReportBaseUrl = environment.api_Url+'report/copayment/seminar/';
  constructor(private http: HttpClient) { }

  getAdminAppointmentReport(body: ReportAppAdminPostInterface): Observable<ReportAppAdminResponseInterface> {
    return this.http.post<ReportAppAdminResponseInterface>(this.appointmentReportBaseUrl + 'admin/', body)
  }
}
