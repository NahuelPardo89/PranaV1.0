import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/Services/Profile/patient/patient.service'; 
import { Patient } from 'src/app/Models/Profile/patient.interface'; 
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent implements OnInit {
  patients: Patient[] = [];
  searchTerm: string = '';
  patientUserName: string = '';
  // Variables de paginación
  pageSize: number = 10;
  pageIndex: number = 0;
  pageEvent: PageEvent = {
    length: 0,
    pageSize: this.pageSize,
    pageIndex: this.pageIndex,
  };
  

  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPatients();
  }
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadPatients();
    
  }
 
  loadPatients(): void {
    this.patientService.getAllPatients().subscribe((data: Patient[]) => {
      const filteredPatients = data.filter((patient) => {
        const userName = patient.user.toString().toLowerCase();
        return userName.includes(this.searchTerm.toLowerCase()) || this.searchTerm.trim() === '';
      });
  
      // Actualiza la propiedad 'length' del paginador con el número total de pacientes
      this.pageEvent.length = filteredPatients.length;
  
      // Calcula el índice de inicio y fin para la página actual
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
  
      // Filtra los pacientes en función de la página actual y el tamaño de la página
      this.patients = filteredPatients.slice(startIndex, endIndex);
    });
  }
  
  
  
  updatePatientUserName(): void {
    this.patientUserName = this.patients.map((patient) => patient.user.toString()).join(', ');
    this.loadPatients();
  }

  deletePatient(id: number): void {
    if (id === undefined || id <= 0) {
      console.error("ID de paciente no válido.");
      return;
    }
  
    this.patientService.deletePatient(id).subscribe(() => {
      // Después de la eliminación, vuelve a cargar la lista de pacientes actualizada
      this.loadPatients();
    });
  }
}