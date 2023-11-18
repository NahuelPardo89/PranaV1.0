import { Component } from '@angular/core';
import { AppointmentPatientGetInterface } from 'src/app/Models/appointments/get-interfaces/appointmentPatientGet.interface';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';

@Component({
  selector: 'app-appointment-patient-list',
  templateUrl: './appointment-patient-list.component.html',
  styleUrls: ['./appointment-patient-list.component.css']
})
export class AppointmentPatientListComponent {
  appointments: AppointmentPatientGetInterface[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getPatientAppointments().subscribe((data: AppointmentPatientGetInterface[]) => {
      this.appointments = data;
    });
  }
}
