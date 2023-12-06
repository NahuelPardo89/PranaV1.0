import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/Services/staff.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  
  staff: any[] = [];

  constructor(private staffService: StaffService, private viewportScroller: ViewportScroller, private router : Router) { }

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
  navigateToAboutUs() {
    this.router.navigate(['/AboutUs']);
}



  ngOnInit(): void {
    this.staffService.getStaff().subscribe(data => {
      this.staff = data.profesionales.map((pro: any) => ({ ...pro, showDescription: false }));
    });
  }
}
