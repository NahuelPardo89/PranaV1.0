import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Medicalspeciality } from 'src/app/Models/Profile/medicalspeciality.interface';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';
import { DialogService } from 'src/app/Services/dialog/dialog.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent {
  doctorForm!: FormGroup;
  doctorName!: string;
  specialties: Medicalspeciality[] = []
  durationOptions = [
    { label: '15 min', value: 15 * 60 },
    { label: '30 min', value: 30 * 60 },
    { label: '45 min', value: 45 * 60 },
    { label: '60 min', value: 60 * 60 },
    { label: '75 min', value: 75 * 60 },
    { label: '90 min', value: 90 * 60 },
    { label: '105 min', value: 105 * 60 },
    { label: '120 min', value: 120 * 60 },
    { label: '135 min', value: 135 * 60 },
    { label: '150 min', value: 150 * 60 },
    { label: '165 min', value: 165 * 60 },
    { label: '180 min', value: 180 * 60 }]
  
    constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorprofileService,
    private dialogService: DialogService,
    private specialityService: SpecialityService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSpecialties();
    if (history.state.doctor) {
      this.doctorName = history.state.doctor.user;
    }
  
  }

  private initForm() {
    this.doctorForm = this.fb.group({
    medicLicence: ['', Validators.required],
    specialty: ['', Validators.required],
    appointment_duration: ['', Validators.required],
    });
  }

  loadSpecialties(): void {    this.specialityService.getSpecialities().subscribe(specialtiesData => {
    this.specialties = specialtiesData;
    
    // Mapea los nombres de las especialidades a sus IDs
    const selectedSpecialties = history.state.doctor.specialty
      .map((specialtyName: string) => 
        this.specialties.find(s => s.name === specialtyName)?.id
      )
      .filter((id: number | undefined) => id != null); // Filtra los undefined si alguna especialidad no se encuentra
    // Convertir la duración a segundos
    const durationInSeconds = this.convertTimeToSeconds(history.state.doctor.appointment_duration);
    
    // Inicializa el formulario con los valores obtenidos
    this.doctorForm.patchValue({
      ...history.state.doctor,
      specialty: selectedSpecialties,
      appointment_duration: durationInSeconds
    });
  });
}

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const doctortId = history.state.doctor ? history.state.doctor.id : null;
      if (doctortId) {
         this.doctorService.partialupdateDoctor(doctortId, this.doctorForm.value).subscribe({
          next: () => {
            this.dialogService.showSuccessDialog("Profesional Editado con éxito")
            this.router.navigate(['Dashboard/accounts/doctores/']); 
          },
          error: (error) => {
            console.log(error);
            this.dialogService.showErrorDialog("Error al actualizar el Profesional")
            
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
    this.router.navigate(['Dashboard/accounts/doctores'])
  }
  private convertTimeToSeconds(timeString: string): number {
    const parts = timeString.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
  
    return (hours * 3600) + (minutes * 60);
  }
}
