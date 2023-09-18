import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/Models/patient.interface';
import { PatientService } from 'src/app/Services/patient/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private patientService: PatientService) {
    this.registerForm = this.formBuilder.group({
      user: [0],
      facebook: [''],
      instagram: [''],
      address: ['', Validators.required],
      is_active: [true]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newPatientData: Patient = this.registerForm.value as Patient;

      // Llama al servicio para crear un nuevo paciente
      this.patientService.createPatient(newPatientData).subscribe(
        (response) => {
          // Maneja la respuesta del servidor o realiza otras acciones aquí
          console.log('Nuevo paciente creado:', response);

          // Limpia el formulario después de crear el paciente
          this.registerForm.reset();
        },
        (error) => {
          // Maneja los errores de la solicitud HTTP aquí
          console.error('Error al crear el paciente:', error);
        }
      );
    } else {
      // El formulario es inválido, muestra mensajes de error si es necesario
    }
  }
}