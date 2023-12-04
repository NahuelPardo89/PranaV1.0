import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { AppointmentAdminGetInterface } from 'src/app/Models/appointments/appointmentAdmin.interface';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';
import { DialogService } from 'src/app/Services/dialog/dialog.service';

@Component({
  selector: 'app-appointment-admin-list',
  templateUrl: './appointment-admin-list.component.html',
  styleUrls: ['./appointment-admin-list.component.css']
})
export class AppointmentAdminListComponent {
  displayedColumns: string[] = [
    'day',
    'hour',
    'patient',
    'doctor',
    'specialty',
    'branch',
    'health_insurance',
    'duration',
    'payment_method',
    'full_cost',
    'patient_copayment',
    'hi_copayment',
    'state'
  ];

  dataSource!: MatTableDataSource<AppointmentAdminGetInterface>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  appointments: AppointmentAdminGetInterface[] = []; //Review

  constructor(
    private appointmentService: AppointmentService,
    private dialogService: DialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setDataTable()
    // this.appointmentService.getAdminAllAppointments().subscribe((data: AppointmentAdminGetInterface[]) => {
    //   this.appointments = data;
    // });
  }

  setDataTable() {
    this.appointmentService.getAdminAllAppointments().subscribe((data: AppointmentAdminGetInterface[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.paginator._intl.itemsPerPageLabel = 'items por página';
      this.paginator._intl.firstPageLabel = 'primera página';
      this.paginator._intl.lastPageLabel = 'última página';
      this.paginator._intl.nextPageLabel = 'página siguiente';
      this.paginator._intl.previousPageLabel = 'página anterior';
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //this.appointments = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
