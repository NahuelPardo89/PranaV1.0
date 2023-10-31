import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { SpecialityBranch } from 'src/app/Models/Profile/branch.interface';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { DoctorScheduleInterface } from 'src/app/Models/Profile/doctorschedule.interface';
import { HealthInsurance } from 'src/app/Models/Profile/healthinsurance.interface';
import { Medicalspeciality } from 'src/app/Models/Profile/medicalspeciality.interface';
import { Patient } from 'src/app/Models/Profile/patient.interface';
import { AppointmentAdminGetInterface } from 'src/app/Models/appointments/appointmentAdmin.interface';
import { AppointmentAdminCreateInterface } from 'src/app/Models/appointments/create-interfaces/appointmentAdminCreate.interface';
import { PaymentMethod } from 'src/app/Models/appointments/paymentmethod.interface';
import { BranchService } from 'src/app/Services/Profile/branch/branch.service';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { DoctorscheduleService } from 'src/app/Services/Profile/doctorschedule/doctorschedule.service';
import { HealthinsuranceService } from 'src/app/Services/Profile/healthinsurance/healthinsurance.service';
import { PatientService } from 'src/app/Services/Profile/patient/patient.service';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';
import { SpecialtyFilterService } from 'src/app/Services/Profile/speciality/specialty-filter/specialty-filter.service';
import { AppointmentService } from 'src/app/Services/appointments/appointment.service';
import { PaymentmethodService } from 'src/app/Services/paymentmethod/paymentmethod.service';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-admin-create.component.html',
  styleUrls: ['./appointment-admin-create.component.css']
})
export class AppointmentAdminCreateComponent implements OnInit {
  appointmentForm: FormGroup;
  appointmentResponse: AppointmentAdminGetInterface;
  doctors: DoctorProfile[] = []; // Review here
  specialtyFilteredDoctors: DoctorProfile[] = [];
  specialties: Medicalspeciality[] = [];
  selectedSpecialty: number | null = null;
  isPaid: boolean | null = null;
  branches: SpecialityBranch[] = [];
  specialtyFilteredBranches: SpecialityBranch[] = [];
  patients: Patient[] = [];
  methods: PaymentMethod[] = [];
  insurances: HealthInsurance[] = [];
  doctorSchedule: DoctorScheduleInterface[] = [];
  states = [
    { value: 1, viewValue: 'Pendiente' },
    { value: 2, viewValue: 'Confirmado' },
    { value: 3, viewValue: 'Adeuda' },
    { value: 4, viewValue: 'Pagado' },
  ];

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
    private doctorScheduleService: DoctorscheduleService
  ) {
    this.appointmentForm = this.fb.group({
      day: ['', Validators.required],
      hour: ['', Validators.required],
      doctor: [null, Validators.required],
      patient: [null, Validators.required],
      duration: [null],
      specialty: [null],
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
    this.loadPatients();
    this.loadMethods();
    this.loadInsurances();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  loadfilteredDoctors(specialtyId: number) {
    this.specialtyFilteredDoctors = this.specialtyFilterService.filterDoctorsBySpecialty(this.doctors, specialtyId);
  }

  loadfilteredBranches(specialtyId: number) {
    this.specialtyFilteredBranches = this.specialtyFilterService.filterBranchesBySpecialty(this.branches, specialtyId);
  }

  onSpecialtyChange(selectedValue: number | null): void {
    this.selectedSpecialty = selectedValue;

    if (selectedValue !== null) {
      this.loadfilteredDoctors(selectedValue);
      this.loadfilteredBranches(selectedValue);
    }
  }

  updatePaymentVisibility(selectedValue: number | null): void {
    this.isPaid = selectedValue === 4;
  }

  loadSpecialties(): void {
    this.specialtyService.getSpecialities().subscribe(data => {
      this.specialties = data;
    })
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data;
    })
  }

  loadMethods(): void {
    this.paymentmethodservice.getPaymentMethods().subscribe(data => {
      this.methods = data
    })
  }

  loadBranches(): void {
    this.branchService.getSpecialityBranches().subscribe(data => {
      this.branches = data
    })
  }

  loadInsurances(): void {
    this.insuranceService.getAll().subscribe(data => {
      this.insurances = data
    })
  }

  loadDoctorSchedule(doctor_id: number): void {
    console.log("Me llamo?");
    this.doctorScheduleService.getDoctorSchedule(doctor_id).subscribe(data => {
      console.log("data schedule: " + data);
      this.doctorSchedule = data
      console.log("Property schedule: " + this.doctorSchedule);
    })
    console.log("termino");
  }

  onSubmit(): void {
    const formValues = this.appointmentForm.value;

    const filteredBody: AppointmentAdminCreateInterface = {
      day: formValues.day,
      hour: formValues.hour,
      doctor: formValues.doctor,
      patient: formValues.patient,
    };

    this.loadDoctorSchedule(filteredBody.doctor);
    console.log("SCHEDULES \n" + this.doctorSchedule + "o soy nada?");

    for (let i = 0; i++; this.doctorSchedule.length) {
      console.log("Schedule: \n" + this.doctorSchedule.at(i)?.day)
    }

    if (formValues.branch !== undefined && formValues.branch !== null) {
      filteredBody.branch = formValues.branch;
    }

    if (formValues.payment_method !== undefined && formValues.payment_method !== null) {
      filteredBody.payment_method = formValues.payment_method;
    }

    if (formValues.full_cost !== undefined && formValues.full_cost !== null) {
      filteredBody.full_cost = formValues.full_cost;
    }

    if (formValues.duration !== undefined && formValues.duration !== null) {
      filteredBody.duration = formValues.duration;
    }

    if (formValues.state !== undefined && formValues.state !== null) {
      filteredBody.state = formValues.state;
    }

    if (formValues.health_insurance !== undefined && formValues.health_insurance !== null) {
      filteredBody.health_insurance = formValues.health_insurance;
    }
    console.log("BODY: ", filteredBody)
    const confirmed = window.confirm('¿Desea confirmar la generación del turno?');
    if (confirmed) {

      this.appointmentService.createAdminAppointment(filteredBody)
        .pipe(
          catchError(error => {
            console.error('Error en la solicitud:', error);

            // Verificar si hay errores específicos en "non_field_errors"
            if (error.error && error.error.non_field_errors) {
              // Obtener el primer mensaje de error en "non_field_errors"
              const errorMessage = error.error.non_field_errors[0];

              // Mostrar una alerta con el mensaje de error específico
              alert('Error al generar el turno: ' + errorMessage);
            } else {
              // Si no hay errores específicos, mostrar un mensaje genérico
              alert('Ha ocurrido un error en la solicitud.');
            }

            throw error;
          })
        )
        .subscribe((data: AppointmentAdminGetInterface) => {
          this.appointmentResponse = data;
          alert("Turno generado exitosamente")
          console.log(data);
        });
    }

  }
}
