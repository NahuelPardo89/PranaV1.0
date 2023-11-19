import { Component, OnInit } from '@angular/core';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';
import { UserService } from 'src/app/Services/users/user.service';
import { HealthInsurance } from 'src/app/Models/Profile/healthinsurance.interface';
import { Medicalspeciality } from 'src/app/Models/Profile/medicalspeciality.interface';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { User } from 'src/app/Models/user/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthinsuranceService } from 'src/app/Services/Profile/healthinsurance/healthinsurance.service';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {
  specialties: Medicalspeciality[] = [];
  users: User[] = [];
  healthInsurances: HealthInsurance[] = [];
  doctorForm: FormGroup;

  // Lista de intervalos de 15 minutos para la duración del turno
  durationIntervals: number[] = Array.from({ length: 13 }, (_, index) => (index + 2) * 15);

  constructor(
    private doctorProfileService: DoctorprofileService,
    private specialtyService: SpecialityService,
    private healthInsuranceService: HealthinsuranceService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.doctorForm = this.fb.group({
      userId: ['', Validators.required],
      matricula: ['', Validators.required],
      specialtyId: ['', Validators.required],
      insuranceIds: [[]], // Usaremos un array para las selecciones múltiples
      duration: [null, Validators.required],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    this.loadSpecialties();
    this.loadUsers();
    this.loadInsurances();
  }

  loadInsurances(): void {
    this.healthInsuranceService.getAll().subscribe(data => {
      this.healthInsurances = data;
    });
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
      console.log('Selected User ID:', this.doctorForm.value.userId);
  
      const selectedUserId = this.doctorForm.value.userId;
      this.userService.getUserById(selectedUserId).subscribe(
        (selectedUser: User) => {
          const formData: DoctorProfile = {
            
            user: selectedUser.id,
            medicLicence: this.doctorForm.value.matricula,
            specialty: [this.doctorForm.value.specialtyId],
            insurances: this.doctorForm.value.insuranceIds,
            is_active: this.doctorForm.value.isActive,
            appointment_duration: this.formatDuration(this.doctorForm.value.duration),
          };

          this.doctorProfileService.createDoctor(formData).subscribe(
            response => {
              console.log('Doctor creado con éxito', response);
            },
            error => {
              console.error('Error al crear el doctor', error);
            }
          );
        },
        error => {
          console.log('Error al obtener el usuario', error);
        }
      );
    } else {
      console.log(this.doctorForm.value.userId);
      console.log(this.doctorForm.value);
      console.log('Formulario no válido');
    }
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:00`;
  }
}

