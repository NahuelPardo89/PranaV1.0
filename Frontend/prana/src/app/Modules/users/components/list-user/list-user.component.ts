import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private userService: UserService, private dialogService:DialogService) {}

  ngOnInit() {
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

  editUser(id: number) {
    const user = this.dataSource.data.find(u => u.id === id);
    this.dialogService
    if (user) {
      const message = `¿Seguro quiere editar el Usuario ${user.last_name} ${user.name}?`;
      this.dialogService.openConfirmDialog(message).afterClosed().subscribe(res => {
        if (res) {
          console.log('ir a formulario de edicion');
        }
      });
    } else {
      alert('Usuario no encontrado');
    }
  }

  deleteUser(id:number) {
    console.log("deleteUser",id)
  }

}

