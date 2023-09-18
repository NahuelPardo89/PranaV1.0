import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent {


  @Output() togglePatientEvent = new EventEmitter<boolean>();

  togglePatient() {
    this.togglePatientEvent.emit(true);
    
  }

  profile: string = '';

  isPatient() {
    this.profile = 'patient';
  }
  isDoctor() {
    this.profile = 'doctor';
  }
  isAdmin() {
    this.profile = 'admin';
  }
}
