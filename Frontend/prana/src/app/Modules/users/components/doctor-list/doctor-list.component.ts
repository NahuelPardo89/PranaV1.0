import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { DialogService } from 'src/app/Services/dialog/dialog.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {
  displayedColumns: string[] = ['id','user','medicLicence','specialty','insurances','appointment_duration','is_active','actions'];
  dataSource!: MatTableDataSource<DoctorProfile>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private doctorService: DoctorprofileService, private dialogService:DialogService,private router:Router) {
    
  }

  ngOnInit() {
    this.setDataTable()
  }

  setDataTable(){
    this.doctorService.getDoctors().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.paginator._intl.itemsPerPageLabel = 'items por página';
      this.paginator._intl.firstPageLabel = 'primera página';
      this.paginator._intl.lastPageLabel ='última página';
      this.paginator._intl.nextPageLabel = 'página siguiente';
      this.paginator._intl.previousPageLabel='página anterior';
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDoctor(doctor: DoctorProfile) {
    console.log(doctor);
    this.router.navigate(['Dashboard/accounts/doctores/edit'], { state: { doctor } });
  }

  deleteDoctor(id: number) {
    const confirmDialogRef = this.dialogService.openConfirmDialog(
      '¿Estás seguro de que deseas desactivar este usuario?'
    );
  

    confirmDialogRef.afterClosed().subscribe(confirmResult => {
      console.log("eliminar usuario")
      if (confirmResult) {
        this.doctorService.deleteDoctor(id).subscribe({
          next: () => {
            // Manejo de la respuesta de eliminación exitosa
            this.setDataTable();
            this.dialogService.showSuccessDialog("Usuario Desactivado con éxito")

            // Aquí podrías, por ejemplo, recargar la lista de usuarios
          },
          error: (error) => {
            // Manejo de errores
            this.dialogService.showErrorDialog("Hubo un error al Desactivar el Usuario")
          }
        });
      }
    });
  }

  activeDoctor(doctor: DoctorProfile){
    doctor.is_active=true;

    this.doctorService.updateDoctor(doctor.id, doctor).subscribe({
      next: () => {
        console.log('Usuario actualizado con éxito');
        this.dialogService.showSuccessDialog("Usuario Activado con éxito")

        this.setDataTable();
      },
      error: (error) => {
        console.error('Error al actualizar el usuario', error);
        this.dialogService.showErrorDialog("Error al Activar el usuario")
        // Aquí podrías añadir alguna lógica para manejar el error, como mostrar un mensaje al usuario
      }
    });
  
}
}
