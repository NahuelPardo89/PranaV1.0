import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Medicalspeciality } from 'src/app/Models/Profile/medicalspeciality.interface';
import { User } from 'src/app/Models/user/user.interface';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';
import { DialogService } from 'src/app/Services/dialog/dialog.service';
import { UserService } from 'src/app/Services/users/user.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.css']
})
export class DoctorCreateComponent {
  specialties: Medicalspeciality[] = [];
  users: User[] = [];
  filteredUsers: Observable<User[]>=new Observable<User[]>();
  doctorForm: FormGroup;
  userControl = new FormControl('', Validators.required);
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
    { label: '180 min', value: 180 * 60 }
  ];
  constructor(
    private doctorProfileService: DoctorprofileService,
    private specialtyService: SpecialityService,
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: DialogService,
    private router: Router,
  ) {
    this.doctorForm = this.fb.group({
      user: this.userControl,
      medicLicence: ['', Validators.required],
      specialty: ['', Validators.required],
      appointment_duration: ['', Validators.required],
      
    });
    
  }

  ngOnInit(): void {
    this.loadSpecialties();
    this.loadUsers();
    this.filterUsers();
    
    
  }
  
  loadSpecialties(): void {    this.specialtyService.getSpecialities().subscribe(data => {
      this.specialties = data;
    });
  }

  
  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  filterUsers(){
    this.filteredUsers = this.doctorForm.get('user')!.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterUsers(name) : this.users.slice())
      );
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const userid =this.doctorForm.value.user.id
      this.doctorForm.value.user=userid;
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
  

  displayUser(user: User): string {
    
    console.log(user)
    return user ? `${user.name} ${user.last_name}` : '';
  }

  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user =>
      user.name!.toLowerCase().includes(filterValue) || 
      user.last_name!.toLowerCase().includes(filterValue)
    );
  }

}
