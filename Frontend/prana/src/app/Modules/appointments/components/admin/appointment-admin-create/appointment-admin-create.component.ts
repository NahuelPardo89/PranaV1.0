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
  doctors: DoctorProfile[] = [];
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
  selectedDoctor: number | null = null;
  formattedDates: string[] = [];
  availableTimes: string[] = [];
  finalJsonDate: string = "";
  finalJsonHour: string = "";
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
    this.loadPaymentMethods();
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

  loadPaymentMethods(): void {
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

  onDoctorSelect(doctorId: number) {
    this.selectedDoctor = doctorId;
    this.doctorScheduleService.getDoctorSchedule(doctorId).subscribe(data => {
      this.doctorSchedule = data;
      this.formattedDates = this.formatDates(this.doctorSchedule);
    });
  }

  onDaySelect(day: string) {
    if (this.selectedDoctor !== null) {
      this.finalJsonDate = this.parseDateStringToDate(day);
      const shortEngDay = this.getShortDayName(day)
      this.doctorScheduleService.getDoctorAvailableTime(this.selectedDoctor, this.finalJsonDate).subscribe(data => {
        this.availableTimes = data.available_times;
      });
    }
    //Else más cosas, limpiar campos del formulario
  }

  onHourSelect(hour: string) {
    this.finalJsonHour = this.getStartAppointmentHour(hour)
  }

  // Section UTILS
  formatDates(doctorSchedule: any): string[] {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    currentDate.setDate(1); // Establece la fecha al primer día del mes

    const daysOfWeekSpanish = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const monthsSpanish = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const formattedDates: string[] = [];
    const today = new Date();

    // Itera sobre este mes y el próximo
    for (let m = 0; m < 2; m++) {
      const daysInMonth = new Date(year, month + m + 1, 0).getDate();

      for (let i = 0; i < daysInMonth; i++) {
        currentDate.setMonth(month + m);
        currentDate.setDate(i + 1); // Establece el día del mes

        // Si la fecha actual es anterior a hoy, continúa con la siguiente iteración
        if (currentDate < today) {
          continue;
        }

        const dayOfWeek = daysOfWeekSpanish[currentDate.getDay()];
        const dayOfMonth = currentDate.getDate();
        const monthName = monthsSpanish[month + m];

        const formattedDate = `${dayOfWeek} ${dayOfMonth} de ${monthName}`;

        // Formatea el día a su nombre en inglés y solo las primeras 3 letras, tal como viene en el schedule
        const englishShortDay = currentDate.toDateString().toLocaleLowerCase().slice(0, 3);
        // Busca si el día del cronograma coincide con el día actual
        const matchingDay = doctorSchedule.find((day: DoctorScheduleInterface) => day.day === englishShortDay);
        if (matchingDay) {
          // Si hay una coincidencia en el cronograma, agrégalo a la fecha formateada
          //formattedDates.push(`${formattedDate} (${matchingDay.start} - ${matchingDay.end})`);
          formattedDates.push(`${formattedDate}`);
        }
      }
    }

    console.log("DATES final: ", formattedDates)
    return formattedDates;
  }


  // Create a class for methods like this (utils) since are usefull on several components
  getShortDayName(fullDate: string): string | null {
    // Define un mapeo de nombres de días en español a nombres en inglés
    const dayMappings: { [key: string]: string } = {
      'Lunes': 'mon',
      'Martes': 'tue',
      'Miércoles': 'wed',
      'Jueves': 'thu',
      'Viernes': 'fri',
      'Sábado': 'sat',
      'Domingo': 'sun',
    };

    // Divide la cadena por espacios en palabras
    const words = fullDate.split(' ');

    // Verifica si hay al menos tres palabras y la primera palabra es un día en español
    if (words.length >= 3 && dayMappings.hasOwnProperty(words[0])) {
      // Usa la primera palabra para buscar el día correspondiente en inglés
      return dayMappings[words[0]];
    }

    return null; // Retorna null si no se puede mapear
  }

  // Create a class for this methods (utils) since are usefull on several components
  parseDateStringToDate(dateString: string): string {
    // Obtén las palabras de la cadena
    const words = dateString.split(' ');

    if (words.length < 4) {
      throw new Error('Cadena de fecha incorrecta. Debe tener el formato "Día número de Mes".');
    }

    // Mapea nombres de mes a números
    const months: { [key: string]: string } = {
      'Enero': '01',
      'Febrero': '02',
      'Marzo': '03',
      'Abril': '04',
      'Mayo': '05',
      'Junio': '06',
      'Julio': '07',
      'Agosto': '08',
      'Septiembre': '09',
      'Octubre': '10',
      'Noviembre': '11',
      'Diciembre': '12',
    };

    // Obtiene el año actual
    const currentYear = new Date().getFullYear();

    // Extrae el día, número y mes de la cadena
    const day = words[0];
    const number = words[1];
    const month = words[3];

    // Convierte el mes en un número
    const monthNumber = months[month];

    // Formatea la fecha en el formato deseado
    const formattedDate = `${currentYear}-${monthNumber}-${number}`;

    return formattedDate;
  }

  // Also on utils
  getStartAppointmentHour(range: string): string {
    const parts = range.split("-");
    if (parts.length !== 2) {
      throw new Error("Datos de entrada incorrectos al querer formatear el horario del turno ");
    }
    else {
      return parts[0].trim()
    }
  }

  onSubmit(): void {
    const formValues = this.appointmentForm.value;

    const filteredBody: AppointmentAdminCreateInterface = {
      //day: formValues.day,
      day: this.finalJsonDate,
      //hour: formValues.hour,
      hour: this.finalJsonHour,
      doctor: formValues.doctor,
      patient: formValues.patient,
    };

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
