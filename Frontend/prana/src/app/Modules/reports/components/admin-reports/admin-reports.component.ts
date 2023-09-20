import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportAppAdminPostInterface } from 'src/app/Models/reports/reportAppAdminPost.interface';
import { ReportAppAdminResponseInterface } from 'src/app/Models/reports/reportAppAdminResponse.interface';
import { ReportService } from 'src/app/Services/reports/report.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {
  reportData: ReportAppAdminResponseInterface;
  // body: ReportAppAdminPostInterface;
  reportForm: FormGroup;

  constructor(private reportService: ReportService, private fb: FormBuilder) {
    // Inicializa el formulario
    this.reportForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      doctor: [null],
      specialty: [null],
      branch: [null],
      payment_method: [null],
    });
    this.reportData = {
      doctor: 0,
      specialty: 0,
      branch: 0,
      payment_method: 0,
      num_patients: 0,
      num_appointments: 0,
      total_patient_copayment: 0,
      total_hi_copayment: 0
    };

  }
  ngOnInit(): void {

  }

  onSubmit() {
    if (this.reportForm.valid) {

      // Obtén los valores del formulario
      const formValues = this.reportForm.value;

      // Filtra los campos que no tengan valor (undefined o null)
      const filteredBody: ReportAppAdminPostInterface = {
        start_date: formValues.start_date,
        end_date: formValues.end_date
      };

      if (formValues.doctor !== undefined && formValues.doctor !== null && formValues.doctor !== "") {
        filteredBody.doctor = formValues.doctor;
      }

      if (formValues.specialty !== undefined && formValues.specialty !== null) {
        filteredBody.specialty = formValues.specialty;
      }

      if (formValues.branch !== undefined && formValues.branch !== null) {
        filteredBody.branch = formValues.branch;
      }

      if (formValues.payment_method !== undefined && formValues.payment_method !== null) {
        filteredBody.payment_method = formValues.payment_method;
      }

      this.reportService.getAdminAppointmentReport(filteredBody)
        .pipe(
          catchError(error => {
            // Manejar el error aquí
            console.error('Error en la solicitud:', error);

            // Verificar si hay errores específicos en "non_field_errors"
            if (error.error && error.error.non_field_errors) {
              // Obtener el primer mensaje de error en "non_field_errors"
              const errorMessage = error.error.non_field_errors[0];

              // Mostrar una alerta con el mensaje de error específico
              alert('Error: ' + errorMessage);
              this.reportData = {
                doctor: 0,
                specialty: 0,
                branch: 0,
                payment_method: 0,
                num_patients: 0,
                num_appointments: 0,
                total_patient_copayment: 0,
                total_hi_copayment: 0
              };
            } else {
              // Si no hay errores específicos, mostrar un mensaje genérico
              alert('Ha ocurrido un error en la solicitud.');
              this.reportData = {
                doctor: 0,
                specialty: 0,
                branch: 0,
                payment_method: 0,
                num_patients: 0,
                num_appointments: 0,
                total_patient_copayment: 0,
                total_hi_copayment: 0
              };
            }

            throw error; // Lanzar el error nuevamente
          })
        )
        .subscribe((data: ReportAppAdminResponseInterface) => {
          this.reportData = data;
          console.log(data);
        });

    }
    else {
      alert("Ingrese un rango de fechas para poder generar un reporte")
    }
  }
}
