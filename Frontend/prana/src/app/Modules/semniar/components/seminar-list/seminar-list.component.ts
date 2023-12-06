import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { Seminar } from 'src/app/Models/seminar/seminar.interface';
import { DialogService } from 'src/app/Services/dialog/dialog.service';
import { SeminarService } from 'src/app/Services/seminar/seminar.service';

@Component({
  selector: 'app-seminar-list',
  templateUrl: './seminar-list.component.html',
  styleUrls: ['./seminar-list.component.css']
})
export class SeminarListComponent {
  displayedColumns: string[] = ['name',  'year','month', 'weekday', 'hour', 'meetingNumber', 'maxInscription', 'price','rooms','seminarist', 'is_active', 'actions'];
  dataSource!: MatTableDataSource<Seminar>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private seminarService: SeminarService, private dialogService: DialogService, private router: Router) {}

  ngOnInit() {
    this.setDataTable();
  }

  setDataTable() {
    this.seminarService.getSeminars().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Aquí agregarás métodos para editar, eliminar y activar seminarios
  // Por ejemplo:
  editSeminar(seminar: Seminar) {
    // Lógica para editar un seminario
  }

  deleteSeminar(id: number) {
    // Lógica para eliminar un seminario
  }

}
