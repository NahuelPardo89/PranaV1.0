import { Component } from '@angular/core';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
@Component({
  selector: 'app-list-doctor-profile',
  templateUrl: './list-doctor-profile.component.html',
  styleUrls: ['./list-doctor-profile.component.css']
})
export class ListDoctorProfileComponent {
  doctors: any[] = [];

  constructor(private doctorService: DoctorprofileService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
      console.log(data)
    }, error => {
      console.error('Error loading doctor profiles', error);
    });
  }
  onEdit(Id: number): void {
    // Aquí puedes agregar la lógica para manejar la edición de la especialidad médica.
    console.log(`Editing speciality with ID: ${Id}`);
}

  onDelete(Id: number): void {
    // Aquí puedes agregar la lógica para manejar la eliminación de la especialidad médica.
    if (confirm('¿Estas seguro que deseas elimninar este doctor?')) {
    console.log(`Deleting speciality with ID: ${Id}`);
    }
}
}

