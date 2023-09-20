import { Component } from '@angular/core';
import { HealthInsurance } from 'src/app/Models/Profile/healthinsurance.interface';
import { HealthinsuranceService } from 'src/app/Services/Profile/healthinsurance/healthinsurance.service';

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
  onEdit(Id: number): void {
    // Aquí puedes agregar la lógica para manejar la edición de la especialidad médica.
    console.log(`Editing speciality with ID: ${Id}`);
}

  onDelete(Id: number): void {
    // Aquí puedes agregar la lógica para manejar la eliminación de la especialidad médica.
    if (confirm('¿Estas seguro que deseas elimninar esta Obra Social?')) {
    console.log(`Deleting speciality with ID: ${Id}`);
    }
}
}
