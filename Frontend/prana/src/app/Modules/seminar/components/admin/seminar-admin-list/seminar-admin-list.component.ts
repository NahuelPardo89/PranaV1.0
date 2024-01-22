import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SeminarAdminInterface } from 'src/app/Models/seminar/seminarAdminInterface.interface';
import { SeminarService } from 'src/app/Services/seminar/seminar.service';

@Component({
  selector: 'app-seminar-admin-list',
  templateUrl: './seminar-admin-list.component.html',
  styleUrls: ['./seminar-admin-list.component.css'],
})
export class SeminarAdminListComponent {
  displayedColumns: string[] = [
    'name',
    'year',
    'month',
    'weekday',
    'hour',
    'meetingNumber',
    'maxInscription',
    'price',
    'rooms',
    'seminarist',
    'is_active',
    'actions',
  ];
  dataSource!: MatTableDataSource<SeminarAdminInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private seminarService: SeminarService, private router: Router) {}

  ngOnInit() {
    this.setDataTable();
  }

  setDataTable() {
    this.seminarService.getSeminars().subscribe((data) => {
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

  onEdit(seminar: SeminarAdminInterface) {
    this.router.navigate(['Dashboard/seminar/admin/update'], {
      state: { seminar },
    });
  }

  onDelete(id: number) {}
}
