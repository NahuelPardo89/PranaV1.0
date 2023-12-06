import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { DialogService } from 'src/app/Services/dialog/dialog.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent {
  doctorForm!: FormGroup;
  patientName!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorprofileService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (history.state.patient) {
      this.patientName=history.state.patient.user
      this.doctorForm.patchValue(history.state.patient);
    }
  }

  private initForm() {
    
    this.doctorForm = this.fb.group({
     
      medicLicence: ['', Validators.required],
      instagram: ['', ],
      address: ['', ],
      
      
    });
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      // Obtén el ID del usuario que se está editando
      const patientId = history.state.patient ? history.state.patient.id : null;
      if (patientId) {
        console.log(history.state.patient);
        this.doctorService.updateDoctor(patientId, this.doctorForm.value).subscribe({
          next: () => {
            
            this.dialogService.showSuccessDialog("Paciente Editado con éxito")

            this.router.navigate(['Dashboard/accounts/pacientes/']); // Ajusta la ruta según sea necesario
          },
          error: (error) => {
            console.log(error);
            this.dialogService.showErrorDialog("Error al actualizar el Paciente")
            // Aquí podrías añadir alguna lógica para manejar el error, como mostrar un mensaje al usuario
          }
        });
      } else {
        console.error('Error: No se pudo obtener el ID del usuario para la actualización.');
        // Manejar el caso en que no se tiene un ID de usuario
      }
    } else {
      console.log('El formulario no es válido');
      // Manejar el caso en que el formulario no es válido
    }
  }
  onCancel(){
    this.router.navigate(['Dashboard/accounts/pacientes'])
  }
}
