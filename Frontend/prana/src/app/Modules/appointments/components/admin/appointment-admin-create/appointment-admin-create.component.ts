import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-admin-create.component.html',
  styleUrls: ['./appointment-admin-create.component.css']
})
export class AppointmentAdminCreateComponent implements OnInit{
  doctors: DoctorProfile[] = [];
  appointmentForm: FormGroup;

  constructor(private doctorService: DoctorprofileService, private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      selectedDoctor: ['']
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }
  
  onSubmit(): void {
    console.log("Selected Doctor:", this.appointmentForm.get('selectedDoctor')?.value);
  }
}
