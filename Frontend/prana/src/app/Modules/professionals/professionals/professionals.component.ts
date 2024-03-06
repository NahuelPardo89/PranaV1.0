import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/Services/staff.service';
@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit {
  staff: any[] = [];
  constructor(private staffService: StaffService){}

  ngOnInit(): void {
    
    this.staffService.getStaff().subscribe(data => {
      this.staff = data.profesionales.map((pro: any) => ({ ...pro, showDescription: false }));
    });
    
  }
}
