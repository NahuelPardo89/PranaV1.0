import { Component } from '@angular/core';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';
import { Patient } from 'src/app/Models/Profile/patient.interface';
import { User } from 'src/app/Models/user/user.interface';
import { DoctorprofileService } from 'src/app/Services/Profile/doctorprofile/doctorprofile.service';
import { PatientService } from 'src/app/Services/Profile/patient/patient.service';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent {
  user!: User;
  doctor!:DoctorProfile
  patient!:Patient
  showUser: boolean = false
  showPatient: boolean = false
  showDoctor: boolean = false

  constructor(private userService: UserService, private doctorService: DoctorprofileService, private patientService:PatientService) {
    this.userService.getLoggedUser().subscribe(user =>{
      
      this.user = user;
      console.log(this.user);
    })

    this.doctorService.getMyDoctorProfile().subscribe(doctor=>{
      this.doctor =doctor
      console.log(this.doctor)
    });
    this.patientService.getCurrentPatient().subscribe(patient=>{
      this.patient = patient
      console.log(this.patient)
    });

    
    
  }
  showUserdata(){
    this.showUser = !this.showUser;
  }

  showPatientdata(){
    this.showPatient = !this.showPatient;
  }

  showDoctordata(){
    this.showDoctor = !this.showDoctor;
  }


}
