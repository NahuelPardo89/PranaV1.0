import { Component } from '@angular/core';
import { DoctorProfile } from 'src/app/Models/doctorprofile.interface';
import { DoctorprofileService } from 'src/app/Services/doctorprofile/doctorprofile.service';
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
}

