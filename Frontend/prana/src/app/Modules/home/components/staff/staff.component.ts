import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/Services/staff.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  
  staff: any[] = [];

  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.staffService.getStaff().subscribe(data => {
      this.staff = data.profesionales.map((pro: any) => ({ ...pro, showDescription: false }));

    });
  }

  // toggleDescription(index: number): void {
  //   this.staff[index].showDescription = !this.staff[index].showDescription;
  // }
}
