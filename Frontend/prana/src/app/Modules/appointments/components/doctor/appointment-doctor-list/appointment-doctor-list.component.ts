import { Component } from '@angular/core';
import { AppointmentDoctorGetInterface } from 'src/app/Models/appointments/get-interfaces/appointmentDoctorGet.interface';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';

@Component({
  selector: 'app-appointment-doctor-list',
  templateUrl: './appointment-doctor-list.component.html',
  styleUrls: ['./appointment-doctor-list.component.css']
})
export class AppointmentDoctorListComponent {
  appointments: AppointmentDoctorGetInterface[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getDoctorAppointments().subscribe((data: AppointmentDoctorGetInterface[]) => {
      this.appointments = data;
    });
  }
}
