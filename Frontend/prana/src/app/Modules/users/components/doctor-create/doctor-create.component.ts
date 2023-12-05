import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { HealthInsurance } from 'src/app/Models/Profile/healthinsurance.interface';
import { Medicalspeciality } from 'src/app/Models/Profile/medicalspeciality.interface';
import { User } from 'src/app/Models/user/user.interface';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { HealthinsuranceService } from 'src/app/Services/Profile/healthinsurance/healthinsurance.service';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';
import { DialogService } from 'src/app/Services/dialog/dialog.service';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.css']
})
export class DoctorCreateComponent {
  specialties: Medicalspeciality[] = [];
  users: User[] = [];
  healthInsurances: HealthInsurance[] = [];
  doctorForm: FormGroup;
  
  // Lista de intervalos de 15 minutos para la duración del turno
  durationIntervals: number[] = Array.from({ length: 13 }, (_, index) => (index + 2) * 15);

  constructor(
    private doctorProfileService: DoctorprofileService,
    private specialtyService: SpecialityService,
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: DialogService,
    private router: Router,
  ) {
    this.doctorForm = this.fb.group({
      user: ['', Validators.required],
      medicLicence: ['', Validators.required],
      specialty: ['', Validators.required],
      appointment_duration: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
    this.loadSpecialties();
    this.loadUsers();
    
  }

  

  loadSpecialties(): void {
    this.specialtyService.getSpecialities().subscribe(data => {
      this.specialties = data;
    });
  }

  getSpecialtyName(specialtyId: number): string {
    const specialty = this.specialties.find(s => s.id === specialtyId);
    return specialty ? specialty.name : 'Sin Solicitar';
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      
      console.log(this.doctorForm.value);
      this.doctorProfileService.createDoctor(this.doctorForm.value).subscribe({
        next: (response) => {
              this.dialog.showSuccessDialog("Usuario creado correctamente");
              this.router.navigate(['/Dashboard/accounts/doctores']);
              
            },
            error: (error) => {
              console.log(error);
              this.dialog.showErrorDialog(error);
            }
            // Opcionalmente, puedes incluir 'complete' si necesitas manejar la finalización
          });
        
    } 
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:00`;
  }


}
