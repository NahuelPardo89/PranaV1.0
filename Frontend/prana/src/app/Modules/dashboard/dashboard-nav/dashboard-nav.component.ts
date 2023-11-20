import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent {
  availableRoles: string[] = [];
  currentRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.availableRoles = this.authService.getUserRoles();
    this.currentRole = this.authService.getCurrentRole();
  }

  changeRole(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Asegura que event.target es un elemento select
    const newRole = selectElement.value;
    if (newRole) {
      this.authService.setCurrentRole(newRole);
    }
  }

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
