import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialityBranch } from 'src/app/Models/Profile/branch.interface';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { Medicalspeciality } from 'src/app/Models/Profile/medicalspeciality.interface';
import { AppointmentAdminGetInterface } from 'src/app/Models/appointments/appointmentAdmin.interface';
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
  appointmentResponse: AppointmentAdminGetInterface;
  doctors: DoctorProfile[] = [];
  specialties: Medicalspeciality[] = [];
  branches: SpecialityBranch[] = [];

  constructor(private doctorService: DoctorprofileService, private fb: FormBuilder, private branchService: BranchService,
    private specialtyService: SpecialityService) {
    this.appointmentForm = this.fb.group({
      day: ['', Validators.required],
      hour: ['', Validators.required],
      doctor: [null, Validators.required],
      patient: [null, Validators.required],
      duration: [null],
      branch: [null],
      state: [null],
      payment_method: [null],
      full_cost: [null],
      health_insurance: [null],
    });
    this.appointmentResponse = {
      id: 0,
      day: new Date(),
      hour: '',
      patient: 0,
      doctor: 0,
      payment_method: 0,
      full_cost: 0,
      hi_copayment: 0,
      patient_copayment: 0,
      specialty: 0,
      branch: 0,
      health_insurance: 0,
      duration: '',
      state: 0,
    }
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
    //console.log("Selected Doctor:", this.appointmentForm.get('selectedDoctor')?.value);
  }
}
