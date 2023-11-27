import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/Services/staff.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  
  staff: any[] = [];

  constructor(private staffService: StaffService, private viewportScroller: ViewportScroller) { }

  scrollToSection() {
    const targetElement = document.getElementById('encontrarnos');
  
    if (targetElement) {
      const offset = window.innerHeight * 0.3;
      const targetPosition = targetElement.offsetTop - offset;
  
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
  scrollToStaff() {
    const targetElement = document.getElementById('staff');
  
    if (targetElement) {
      const offset = window.innerHeight * 0.3;
      const targetPosition = targetElement.offsetTop - offset;
  
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }



  ngOnInit(): void {
    this.staffService.getStaff().subscribe(data => {
      this.staff = data.profesionales.map((pro: any) => ({ ...pro, showDescription: false }));
    });
  }
}
