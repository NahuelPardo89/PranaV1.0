import { Component, OnInit } from '@angular/core';
import { AppointmentAdminInterface } from 'src/app/Models/appointments/appointmentAdmin.interface';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';

@Component({
  selector: 'app-appointment-admin-list',
  templateUrl: './appointment-admin-list.component.html',
  styleUrls: ['./appointment-admin-list.component.css']
})
export class AppointmentAdminListComponent implements OnInit {
  appointments: AppointmentAdminInterface[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAdminAppointments().subscribe((data: AppointmentAdminInterface[]) => {
      this.appointments = data;
    });
  }
}
