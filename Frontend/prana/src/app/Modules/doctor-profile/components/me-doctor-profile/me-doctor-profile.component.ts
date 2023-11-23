import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';

@Component({
  selector: 'app-me-doctor-profile',
  templateUrl: './me-doctor-profile.component.html',
  styleUrls: ['./me-doctor-profile.component.css']
})
export class MeDoctorProfileComponent {
  doctorForm!: FormGroup;

  constructor(private fb: FormBuilder, private doctorService: DoctorprofileService) {}

  ngOnInit() {
    this.createForm();
    this.loadDoctorProfile();
  }

  createForm() {
    this.doctorForm = this.fb.group({
      medicLicence: ['', Validators.required],
      specialty: [], // Ajusta según sea necesario
      insurances: [], // Ajusta según sea necesario
    });
  }

  loadDoctorProfile() {
    this.doctorService.getMyDoctorProfile().subscribe(
      profile => {
        console.log(profile);
        this.doctorForm.patchValue({
          medicLicence: profile.medicLicence,
          specialty: profile.specialty,
          insurances: profile.insurances,
          // No necesitas pasar 'is_active' si no es editable
        });
      },
      error => {
        console.error('Error al obtener el perfil del doctor', error);
      }
    );
  }

  

  saveProfile() {
    if (this.doctorForm.valid) {
      this.doctorService.updateMyDoctorProfile(this.doctorForm.value).subscribe({
        next: (updatedProfile) => {
          // Manejo después de actualizar el perfil
          console.log('Perfil actualizado:', updatedProfile);
        },
        error: (err) => console.error(err)
      });
    }
  }

  editMedicLicence() {
    // Lógica para editar la licencia médica
  }

  editSpecialty(index: number) {
    // Lógica para editar la especialidad
  }

  deleteSpecialty(index: number) {
    // Lógica para borrar la especialidad
  }

  editInsurance(index: number) {
    // Lógica para editar el seguro
  }

  deleteInsurance(index: number) {
    // Lógica para borrar el seguro
  }

  
}
