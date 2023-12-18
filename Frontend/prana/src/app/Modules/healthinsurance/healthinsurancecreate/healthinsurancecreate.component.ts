import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthinsuranceService } from 'src/app/Services/Profile/healthinsurance/insurance/healthinsurance.service';

@Component({
  selector: 'app-healthinsurancecreate',
  templateUrl: './healthinsurancecreate.component.html',
  styleUrls: ['./healthinsurancecreate.component.css']
})
export class HealthinsurancecreateComponent {
  healthInsuranceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private healthInsuranceService: HealthinsuranceService
  ) {
    this.healthInsuranceForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  create(): void {
    if (this.healthInsuranceForm.valid) {
      this.healthInsuranceService.create(this.healthInsuranceForm.value).subscribe(() => {
        alert('HealthInsurance created successfully');
        // Puedes redireccionar al usuario o realizar alguna otra acción tras la creación
      });
    }
  }
}
