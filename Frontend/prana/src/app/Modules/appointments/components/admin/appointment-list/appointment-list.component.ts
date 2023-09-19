import { Component, OnInit } from '@angular/core';
import { AppointmentAdminInterface } from 'src/app/Models/appointments/appointmentAdmin.interface';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: AppointmentAdminInterface[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAdminAppointments().subscribe((data: AppointmentAdminInterface[]) => {
      this.appointments = data;
      console.log(data);
    });
  }
}
