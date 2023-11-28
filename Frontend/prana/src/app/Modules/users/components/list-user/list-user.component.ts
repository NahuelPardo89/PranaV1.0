import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user/user.interface';
import { DialogService } from 'src/app/Services/dialog/dialog.service';
import { UserService } from 'src/app/Services/users/user.service';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  displayedColumns: string[] = ['id', 'dni', 'name', 'last_name', 'email', 'phone', 'is_active', 'is_staff','actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialogService:DialogService,private router:Router) {}

  ngOnInit() {
    this.setDataTable()
  }

  setDataTable(){
    this.userService.getUsers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
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

  editUser(user: User) {
    console.log(user);
    this.router.navigate(['Dashboard/users/edit'], { state: { user } });
  }

  deleteUser(id: number) {
    const confirmDialogRef = this.dialogService.openConfirmDialog(
      '¿Estás seguro de que deseas eliminar este usuario?'
    );

    confirmDialogRef.afterClosed().subscribe(confirmResult => {
      console.log("eliminar usuario")
      if (confirmResult) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            // Manejo de la respuesta de eliminación exitosa
            this.setDataTable();
            this.dialogService.showSuccessDialog("Usuario Eliminado con éxito")

            // Aquí podrías, por ejemplo, recargar la lista de usuarios
          },
          error: (error) => {
            // Manejo de errores
            this.dialogService.showErrorDialog("Hubo un error al eliminar Usuario")
          }
        });
      }
    });
  }

}

