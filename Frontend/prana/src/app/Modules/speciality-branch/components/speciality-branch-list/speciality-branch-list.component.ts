import { Component } from '@angular/core';
import { SpecialityBranch } from 'src/app/Models/Profile/branch.interface';
import { BranchService } from 'src/app/Services/Profile/branch/branch.service';

@Component({
  selector: 'app-speciality-branch-list',
  templateUrl: './speciality-branch-list.component.html',
  styleUrls: ['./speciality-branch-list.component.css']
})
export class SpecialityBranchListComponent {
  branches: SpecialityBranch[] = [];

  constructor(private branchService: BranchService) { }

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.branchService.getSpecialityBranches().subscribe(data => {
      this.branches = data;
    }, error => {
      console.error('Error loading speciality branches', error);
    });
  }

  onEdit(branchId: number): void {
    // Aquí puedes añadir la lógica para manejar la edición de la rama de especialidad.
    console.log(`Editing branch with ID: ${branchId}`);
  }

  onDelete(branchId: number): void {
    // Aquí puedes añadir la lógica para manejar la eliminación de la rama de especialidad.
    console.log(`Deleting branch with ID: ${branchId}`);
  }
}

