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
  showRoleSelector: boolean = false;
  showInsuranceOptions = false;
  showUserOptions = false;
  showSeminarOptions = false;
  showAppoimentPatientOptions = false;
  showSeminarPatientOptions = false;
  showSeminarSeminaristOptions = false;
  showDoctorEspecialityOptions = false;

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

  toggleRoleSelector(): void {
    this.showRoleSelector = !this.showRoleSelector;
    console.log("Role selector toggled. Current state:", this.showRoleSelector);
  }

  toggleInsuranceOptions() {
    this.showInsuranceOptions = !this.showInsuranceOptions;
  }
  toggleUserOptions() {
    this.showUserOptions = !this.showUserOptions;
  }
  toggleSeminarOptions() {
    this.showSeminarOptions = !this.showSeminarOptions;
  }
  toggleAppoimentPatientOptions() {
    this. showAppoimentPatientOptions = !this. showAppoimentPatientOptions;
  }

  toggleSeminarPatientOptions() {
    this.showSeminarPatientOptions = !this.showSeminarPatientOptions;
  }
  toggleSeminarSeminaristOptions() {
    this.showSeminarSeminaristOptions = !this.showSeminarSeminaristOptions;
  }

  toggleDoctorEspecialityOptions() {
    this.showDoctorEspecialityOptions = !this.showDoctorEspecialityOptions;
  }


}
