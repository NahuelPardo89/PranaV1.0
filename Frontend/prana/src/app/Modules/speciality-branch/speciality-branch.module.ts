import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialityBranchRoutingModule } from './speciality-branch-routing.module';
import { SpecialityBranchListComponent } from './components/speciality-branch-list/speciality-branch-list.component';
import { BranchService } from 'src/app/Services/Profile/branch/branch.service';


@NgModule({
  declarations: [
    SpecialityBranchListComponent
  ],
  imports: [
    CommonModule,
    SpecialityBranchRoutingModule
  ],
  providers: [BranchService]
})
export class SpecialityBranchModule { }
