import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit{
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAdminAppointments().subscribe((data: any[]) => {
      this.appointments = data;
    });
  }
}
