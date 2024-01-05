import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError } from 'rxjs';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';
import { DialogService } from 'src/app/Services/dialog/dialog.service';
import { AppointmentDoctorGetInterface } from 'src/app/Models/appointments/get-interfaces/appointmentDoctorGet.interface';

@Component({
  selector: 'app-appointment-doctor-list',
  templateUrl: './appointment-doctor-list.component.html',
  styleUrls: ['./appointment-doctor-list.component.css']
})
export class AppointmentDoctorListComponent {

  displayedColumns: string[] = [
    'day',
    'hour',
    'patient',
    //'doctor',
    //'specialty',
    'branch',
    'health_insurance',
    'patient_copayment',
    'hi_copayment',
    'state',
    'actions'
  ];

  dataSource!: MatTableDataSource<AppointmentDoctorGetInterface>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  appointments: AppointmentDoctorGetInterface[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private dialogService: DialogService,
  ) { }

  /**
  * Initializes the component and sets the data table.
  * @author Alvaro Olguin
  */
  ngOnInit(): void {
    this.setDataTable()
  }

  /**
  * Sets the data table with appointments. If a day is provided, it gets the doctor's appointments for that day. 
  * Otherwise, it gets all the doctor's appointments.
  * @param {string} day - The day for which to get the doctor's appointments.
  * @author Alvaro Olguin
  */
  setDataTable(day?: string) {
    let observable: Observable<AppointmentDoctorGetInterface[]>;
    if (day) {
      observable = this.appointmentService.getDoctorsTodayAppointments(day);
    } else {
      observable = this.appointmentService.getDoctorAllAppointments();
    }
    observable.subscribe((data: AppointmentDoctorGetInterface[]) => {
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

  /**
  * Sets the data table with all the doctor's appointments.
  * @author Alvaro Olguin
  */
  showAll() {
    this.setDataTable();
  }

  /**
  * Filters the doctor's appointments for the current day and sets the data table.
  * @author Alvaro Olguin
  */
  filterToday() {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.setDataTable(today);
  }

  /**
  * Applies a filter to the data source when an event is triggered.
  * @param {Event} event - The event that triggered the filter.
  * @author Alvaro Olguin
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
  * Determines whether an appointment can be deleted. An appointment can be deleted if its state is not 'Pagado' and its day is later than today.
  * @param {any} row - The row representing the appointment in the data table.
  * @returns {boolean} - Returns true if the appointment can be deleted, false otherwise.
  * @author Alvaro Olguin
  */
  canDelete(row: any): boolean {
    let dateParts = row.day.split("-");
    let formattedDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return row.state.toUpperCase() != 'PAGADO' && formattedDate > new Date();
  }

  /**
  * Deletes an appointment when its ID is provided. It opens a confirmation dialog before deleting the appointment. 
  * If the deletion is confirmed, it sends a request to delete the appointment and updates the data table.
  * @param {number} appointment_id - The ID of the appointment to delete.
  * @author Alvaro Olguin
  */
  onDelete(appointment_id: number): void {
    const confirmDialogRef = this.dialogService.openConfirmDialog(
      '¿Confirma la eliminación de este turno?'
    );

    confirmDialogRef.afterClosed().subscribe(confirmResult => {
      if (confirmResult) {
        this.appointmentService.deleteDoctorAppointment(appointment_id).pipe(

          catchError(error => {
            console.error('Error en la solicitud:', error);

            // Checks "non_field_errors"
            if (error.error && error.error.non_field_errors) {
              const errorMessage = error.error.non_field_errors[0];
              this.dialogService.showErrorDialog('Error al eliminar el turno: ' + errorMessage);
            } else {
              // Show a general error
              this.dialogService.showErrorDialog('Ha ocurrido un error en la solicitud.');
            }

            throw error;
          })
        ).subscribe((data: any) => {
          this.setDataTable();
          this.dialogService.showSuccessDialog("Turno eliminado con éxito");
        })

      }
    });
  }
}
