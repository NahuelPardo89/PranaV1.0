import { Injectable } from '@angular/core';
import { SpecialityBranch } from 'src/app/Models/Profile/branch.interface';
import { DoctorProfile } from 'src/app/Models/Profile/doctorprofile.interface';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyFilterService {

  constructor() { }

  filterDoctorsBySpecialty(doctors: DoctorProfile[], specialtyId: number): DoctorProfile[] {
    return doctors.filter(doctor => doctor.specialty.includes(specialtyId));
  }

  filterBranchesBySpecialty(branches: SpecialityBranch[], specialtyId: number): SpecialityBranch[] {
    return branches.filter(branches => branches.speciality === specialtyId);
  }

}
