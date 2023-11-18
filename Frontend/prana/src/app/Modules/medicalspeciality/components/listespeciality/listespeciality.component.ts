import { Component } from '@angular/core';
import { Medicalspeciality } from 'src/app/Models/Profile/medicalspeciality.interface';
import { SpecialityService } from 'src/app/Services/Profile/speciality/speciality.service';

@Component({
  selector: 'app-listespeciality',
  templateUrl: './listespeciality.component.html',
  styleUrls: ['./listespeciality.component.css']
})
export class ListespecialityComponent {
  specialities: Medicalspeciality[] = [];

  constructor(private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.loadSpecialities();
  }

  loadSpecialities(): void {
    this.specialityService.getSpecialities().subscribe(data => {
      this.specialities = data;
    }, error => {
      console.error('Error loading medical specialities', error);
    });
  }
  onEdit(specialityId: number): void {
    // Aquí puedes agregar la lógica para manejar la edición de la especialidad médica.
    console.log(`Editing speciality with ID: ${specialityId}`);
}

  onDelete(specialityId: number): void {
    if (confirm('¿Estas seguro que deseas elimninar esta Obra Social?')) {
    console.log(`Deleting speciality with ID: ${specialityId}`);
    }
}
}
