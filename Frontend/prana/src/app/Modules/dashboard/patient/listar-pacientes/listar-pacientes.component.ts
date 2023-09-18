import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/Services/patient/patient.service'; 
import { Patient } from 'src/app/Models/patient.interface'; 


@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe((data: Patient[]) => {
      this.patients = data;
      // console.log(data);
    });
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