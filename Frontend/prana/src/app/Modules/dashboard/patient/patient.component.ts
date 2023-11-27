import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/Models/Profile/patient.interface';
import { PatientService } from 'src/app/Services/Profile/patient/patient.service';
import { UserService } from 'src/app/Services/users/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  registerForm: FormGroup;
  users: any[] = [];
  
  filterText: string = '';
  selectedUser: any;


  constructor(
    private formBuilder: FormBuilder, 
    private patientService: PatientService,
    private userService: UserService
    ) {
    this.registerForm = this.formBuilder.group({
      user: [0],
      facebook: [''],
      instagram: [''],
      address: ['', Validators.required],
      is_active: [true]
    });
  }
  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.filteredUsers = [...this.users];
        console.log(this.users)
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  filteredUsers: any[] = [];

  filterUsers() {
    this.filteredUsers = this.users.filter((user) => {
      const searchTerm = this.filterText.toLowerCase();
      return user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
    });
  }

  
}

