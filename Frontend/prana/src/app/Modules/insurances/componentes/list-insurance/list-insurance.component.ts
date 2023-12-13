import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HealthInsurance } from 'src/app/Models/Profile/healthinsurance.interface';
import { HealthinsuranceService } from 'src/app/Services/Profile/healthinsurance/healthinsurance.service';
import { DialogService } from 'src/app/Services/dialog/dialog.service';

@Component({
  selector: 'app-list-insurance',
  templateUrl: './list-insurance.component.html',
  styleUrls: ['./list-insurance.component.css']
})
export class ListInsuranceComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'is_active',
    'actions',
    
  ];
  dataSource!: MatTableDataSource<HealthInsurance>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private insuranceService: HealthinsuranceService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setDataTable();
  }

  setDataTable() {
    this.insuranceService.getAll().subscribe((data) => {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  insuranceEdit(insureance:HealthInsurance){}
  insuranceDelete(id:number){}
  activeInsurance(insurance:HealthInsurance){}
}
