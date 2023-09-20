import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecialityBranch } from 'src/app/Models/Profile/branch.interface';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { Medicalspeciality } from 'src/app/Models/Profile/medicalspeciality.interface';
import { BranchService } from 'src/app/Services/Profile/branch/branch.service';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-admin-create.component.html',
  styleUrls: ['./appointment-admin-create.component.css']
})
export class AppointmentAdminCreateComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors: DoctorProfile[] = [];
  specialties: Medicalspeciality[] = [];
  branches: SpecialityBranch[] = [];

  constructor(private doctorService: DoctorprofileService, private fb: FormBuilder, private branchService: BranchService,
    private specialtyService: SpecialityService) {
    this.appointmentForm = this.fb.group({
      selectedDoctor: ['']
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecialties();
    this.loadBranches();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  loadSpecialties(): void {
    this.specialtyService.getSpecialities().subscribe(data => {
      this.specialties = data;
    })
  }

  loadBranches(): void {
    this.branchService.getSpecialityBranches().subscribe(data => {
      this.branches = data
    })
  }

  onSubmit(): void {
    console.log("Selected Doctor:", this.appointmentForm.get('selectedDoctor')?.value);
  }
}
