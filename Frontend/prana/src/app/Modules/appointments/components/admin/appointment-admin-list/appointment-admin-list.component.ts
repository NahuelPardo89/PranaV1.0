import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
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
    //'branch',
    'health_insurance',
    //'payment_method',
    //'full_cost',
    'patient_copayment',
    'hi_copayment',
    'state',
    'actions'
  ];

  dataSource!: MatTableDataSource<AppointmentAdminGetInterface>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private appointmentService: AppointmentService,
    private dialogService: DialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setDataTable()
  }

  setDataTable(day?: string) {
    let observable: Observable<AppointmentAdminGetInterface[]>;
    if (day) {
      observable = this.appointmentService.getAdminTodayAppointments(day);
    } else {
      observable = this.appointmentService.getAdminAllAppointments();
    }
    observable.subscribe((data: AppointmentAdminGetInterface[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.paginator._intl.itemsPerPageLabel = 'items por página';
      this.paginator._intl.firstPageLabel = 'primera página';
      this.paginator._intl.lastPageLabel = 'última página';
      this.paginator._intl.nextPageLabel = 'página siguiente';
      this.paginator._intl.previousPageLabel = 'página anterior';
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  showAll() {
    this.setDataTable();
  }

  filterToday() {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.setDataTable(today);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(appointment: AppointmentAdminGetInterface): void {
    this.router.navigate(['Dashboard/appointments/admin/update'], { state: { appointment } });
  }

  onDelete(appointment_id: number): void {
    const confirmDialogRef = this.dialogService.openConfirmDialog(
      '¿Confirma la eliminación de este turno?'
    );

    confirmDialogRef.afterClosed().subscribe(confirmResult => {
      if (confirmResult) {
        this.appointmentService.deleteAdminAppointment(appointment_id).pipe(

          catchError(error => {
            console.error('Error en la solicitud:', error);

            // Checks "non_field_errors"
            if (error.error && error.error.non_field_errors) {
              const errorMessage = error.error.non_field_errors[0];
              this.dialogService.showErrorDialog('Error al generar el turno: ' + errorMessage);
            } else {
              // Show a general error
              this.dialogService.showErrorDialog('Ha ocurrido un error en la solicitud.');
            }

            throw error;
          })
        ).subscribe((data: any) => {
          this.setDataTable();
          this.dialogService.showSuccessDialog("Turno eliminado con éxito" + data)
        })

      }
    });
  }

}
