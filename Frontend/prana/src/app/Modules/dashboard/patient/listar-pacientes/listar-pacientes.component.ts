import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/Services/Profile/patient/patient.service'; 
import { Patient } from 'src/app/Models/Profile/patient.interface'; 
import { FormBuilder, FormGroup } from '@angular/forms';
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

  editingPatientId: number | null = null;
  editForm: FormGroup;
  

  

  
  constructor(private patientService: PatientService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      address: [''],
      facebook: [''],
      instagram: [''],
      insurance: [0]
    });
  }
  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPatients();
  }


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
    
      return;
    }
  
    this.patientService.deletePatient(id).subscribe(() => {
      // Después de la eliminación, vuelve a cargar la lista de pacientes actualizada
      this.loadPatients();
    });
  }

  editPatient(id: number): void {
    this.editingPatientId = id;
    this.patientService.getPatientDetailsById(id).subscribe((patient: Patient) => {
      // Llenar los campos del formulario con la información actual del paciente
      this.editForm.patchValue({
        address: patient.address,
        facebook: patient.facebook,
        instagram: patient.instagram,
        insurance: patient.insurance
      });
    });
  }

  cancelEdit(): void {
    this.editingPatientId = null;
    this.editForm.reset();
  }

  // Método para enviar la actualización al servicio
  saveEdit(): void {
    if (this.editingPatientId !== null) {
      const editedData = this.editForm.value;
      this.patientService.updatePatient(this.editingPatientId, editedData).subscribe(() => {
        this.loadPatients();
        this.cancelEdit();
      });
    }
  }
}