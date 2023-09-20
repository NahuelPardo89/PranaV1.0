import { Component, OnInit } from '@angular/core';
import { AppointmentAdminGetInterface } from 'src/app/Models/appointments/appointmentAdmin.interface';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';

@Component({
  selector: 'app-appointment-admin-list',
  templateUrl: './appointment-admin-list.component.html',
  styleUrls: ['./appointment-admin-list.component.css']
})
export class AppointmentAdminListComponent implements OnInit {
  appointments: AppointmentAdminGetInterface[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAdminAppointments().subscribe((data: AppointmentAdminGetInterface[]) => {
      this.appointments = data;
    });
  }
  onEdit(Id: number): void {
    // Aquí puedes agregar la lógica para manejar la edición de la especialidad médica.
    console.log(`Editing speciality with ID: ${Id}`);
  }

  onDelete(Id: number): void {
    // Aquí puedes agregar la lógica para manejar la eliminación de la especialidad médica.
    if (confirm('¿Estas seguro que deseas elimninar este Turno?')) {
      console.log(`Deleting speciality with ID: ${Id}`);
    }
  }
}
