import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StaffService } from 'src/app/Services/staff.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/Services/Profile/patient/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/Models/Profile/patient.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit, AfterViewInit {

  webInstragram: string = '';
  

  dataSource!: MatTableDataSource<Patient>;
  
  staff: any[] = [];

  // Variables de carrousel
  slider = document.querySelector('.carrousel');
  rootStyles = document.documentElement.style;
  sliderElements = document.querySelectorAll('.carrousel-item');
  sliderCounter = 0;

  

  constructor(private staffService: StaffService, private viewportScroller: ViewportScroller, private router : Router, private patientService: PatientService, private sanitizer: DomSanitizer) { }

 

  getIg = () => {
    this.patientService.getAllPatients().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      const filterValue = 'PRANA';
      this.dataSource.filter = filterValue.trim();
      this.webInstragram= this.dataSource.filteredData[0].instagram;
      
    });
  }
  get instagramUrl(): SafeResourceUrl {
    const unsafeUrl = `https://www.instagram.com/${this.webInstragram}/embed/`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
  

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
    this.router.navigate(['/aboutus']);
}



  ngOnInit(): void {
    
    this.staffService.getStaff().subscribe(data => {
      this.staff = data.profesionales.map((pro: any) => ({ ...pro, showDescription: false }));
    });
    this.getIg();
  }


  ngAfterViewInit(): void {
    this.sliderElements = document.querySelectorAll('.carrousel-item');
    this.updateImageVisibility();
  }

  getTransformValue = () => Number(this.rootStyles.getPropertyValue('--slide-transform').replace('px', ''));

  updateImageVisibility() {
    this.sliderElements.forEach((element, index) => {
      const image = element.querySelector('img');
      if (image) {
        // Agregar la clase hidden-image a todas las imágenes
        image.classList.add('hidden-image');

        if (index === this.sliderCounter) {
          // Retirar la clase hidden-image de la imagen seleccionada
          image.classList.remove('hidden-image');
        }
      }
    });
  }

  slideToRight = () => {
    const lastItemIndex = this.sliderElements.length - 1;

    if (this.sliderCounter < lastItemIndex) {
      this.sliderCounter++;
    } else {
      // Si llega al final, vuelve al principio
      this.sliderCounter = 0;
    }

    const transformValue = this.getTransformValue();
    this.rootStyles.setProperty('--slide-transform', `-${this.sliderCounter * this.sliderElements[0].scrollWidth}px`);

    // Actualizar la visibilidad de las imágenes después de cambiar la posición del carrousel
    this.updateImageVisibility();
  };

  slideToLeft = () => {
    const lastItemIndex = this.sliderElements.length - 1;

    if (this.sliderCounter > 0) {
      this.sliderCounter--;
    } else {
      // Si está en el principio, va al final
      this.sliderCounter = lastItemIndex;
    }

    const transformValue = this.getTransformValue();
    this.rootStyles.setProperty('--slide-transform', `-${this.sliderCounter * this.sliderElements[0].scrollWidth}px`);

    // Actualizar la visibilidad de las imágenes después de cambiar la posición del carrousel
    this.updateImageVisibility();
  };

  
}


