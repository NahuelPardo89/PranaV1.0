import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { SpecialityBranch } from 'src/app/Models/Profile/branch.interface';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { DoctorScheduleInterface } from 'src/app/Models/Profile/doctorschedule.interface';
import { HealthInsurance } from 'src/app/Models/Profile/healthinsurance.interface';
import { Medicalspeciality } from 'src/app/Models/Profile/medicalspeciality.interface';
import { Patient } from 'src/app/Models/Profile/patient.interface';
import { AppointmentAdminGetInterface } from 'src/app/Models/appointments/appointmentAdmin.interface';
import { AppointmentAdminCreateInterface } from 'src/app/Models/appointments/create-interfaces/appointmentAdminCreate.interface';
import { PaymentMethod } from 'src/app/Models/appointments/paymentmethod.interface';
import { SeminarAdminInterface } from 'src/app/Models/seminar/seminarAdminInterface.interface';
import { BranchService } from 'src/app/Services/Profile/branch/branch.service';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { DoctorscheduleService } from 'src/app/Services/Profile/doctorschedule/doctorschedule.service';
import { HealthinsuranceService } from 'src/app/Services/Profile/healthinsurance/insurance/healthinsurance.service';
import { PatientService } from 'src/app/Services/Profile/patient/patient.service';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';
import { SpecialtyFilterService } from 'src/app/Services/Profile/speciality/specialty-filter/specialty-filter.service';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';
import { DialogService } from 'src/app/Services/dialog/dialog.service';
import { PaymentmethodService } from 'src/app/Services/paymentmethod/paymentmethod.service';

@Component({
  selector: 'app-seminar-admin-create',
  templateUrl: './seminar-admin-create.component.html',
  styleUrls: ['./seminar-admin-create.component.css'],
})
export class SeminarAdminCreateComponent {
  // Form
  seminarForm: FormGroup;
  // Response data
  seminarResponse: SeminarAdminInterface;
  // Data
  patients: Patient[] = [];
  doctors: DoctorProfile[] = [];
  specialties: Medicalspeciality[] = [];
  methods: PaymentMethod[] = [];
  insurances: HealthInsurance[] = [];
  // Filtered Data
  doctorSchedule: DoctorScheduleInterface[] = [];
  specialtyFilteredDoctors: DoctorProfile[] = [];
  specialtyFilteredBranches: SpecialityBranch[] = [];
  //Selections
  selectedSpecialty: number = 0;
  selectedBranch: number = 0;
  selectedPatient: number = 0;
  selectedDoctor: number = 0;
  // Auxiliar Variables
  isPaid: boolean | null = null;
  formattedDates: string[] = [];
  availableTimes: string[] = [];
  finalJsonDate: string = '';
  finalJsonHour: string = '';
  appointment_status_choices = [
    { value: 1, viewValue: 'Pendiente' },
    { value: 2, viewValue: 'Confirmado' },
    { value: 3, viewValue: 'Finalizado' },
  ];
  payment_status_choices = [
    { value: 1, viewValue: 'Adeuda' },
    { value: 2, viewValue: 'Pagado' },
  ];
  //FormControls
  doctorControl = new FormControl();
  patientControl = new FormControl();
  specialtyControl = new FormControl();
  // Observables to reactive filter
  filteredSpecialties: Observable<Medicalspeciality[]> = of([]);
  filteredDoctors: Observable<DoctorProfile[]> = of([]);
  filteredPatients: Observable<Patient[]> = of([]);
  // Preview Variables
  patientName: string = '';
  doctorName: string = '';
  specialtytName: string = '';
  branchName: string = '';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorprofileService,
    private branchService: BranchService,
    private specialtyService: SpecialityService,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private paymentmethodservice: PaymentmethodService,
    private insuranceService: HealthinsuranceService,
    private specialtyFilterService: SpecialtyFilterService,
    private doctorScheduleService: DoctorscheduleService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.seminarForm = this.fb.group({
      name: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
      schedule: [null, Validators.required],
      meetingNumber: [null, Validators.required],
      maxInscription: [null, Validators.required],
      price: [null],
      is_active: [null],
      seminarist: [null],
      patients: [null],
      rooms: [null],
    });
    this.seminarResponse = {
      id: 0,
      name: '',
      month: '',
      year: 0,
      schedule: [],
      meetingNumber: 0,
      maxInscription: 0,
      price: 0,
      is_active: false,
      seminarist: [],
      patients: [],
      rooms: [],
    };
  }
}
