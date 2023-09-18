import { Component } from '@angular/core';
import { HealthInsurance } from 'src/app/Models/healthinsurance.interface';
import { HealthinsuranceService } from 'src/app/Services/healthinsurance.service';

@Component({
  selector: 'app-healthinsurancelist',
  templateUrl: './healthinsurancelist.component.html',
  styleUrls: ['./healthinsurancelist.component.css']
})
export class HealthinsurancelistComponent {
  healthInsurances: HealthInsurance[] = [];

  constructor(private healthInsuranceService: HealthinsuranceService) { }

  ngOnInit(): void {
    this.healthInsuranceService.getAll().subscribe(data => {
      this.healthInsurances = data;
    });
  }
  delete(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.healthInsuranceService.delete(id).subscribe(() => {
        // Remove the deleted item from the list
        this.healthInsurances = this.healthInsurances.filter(item => item.id !== id);
      });
    }
  }
}
