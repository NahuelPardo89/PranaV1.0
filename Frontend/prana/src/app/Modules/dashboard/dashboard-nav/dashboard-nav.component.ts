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
    console.log('apretado')
  }
  
}
