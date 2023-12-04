import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Patient } from 'src/app/Models/Profile/patient.interface';
import { PatientService } from 'src/app/Services/Profile/patient/patient.service';
import { DialogService } from 'src/app/Services/dialog/dialog.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
  displayedColumns: string[] = [ 'user','facebook','instagram','address','is_active','insurances','actions'];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientService, private dialogService:DialogService,private router:Router) {
    
  }
  ngOnInit() {
    this.setDataTable()
  }

  setDataTable(){
    this.patientService.getAllPatients().subscribe(data => {
      console.log(data)
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
  editPatient(patient: Patient) {}
  deletePatient(id: number){}
}
