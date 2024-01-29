import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StaffService } from 'src/app/Services/staff.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit, AfterViewInit {
  
  staff: any[] = [];

  // Variables de carrousel
  slider = document.querySelector('.carrousel');
  rootStyles = document.documentElement.style;
  sliderElements = document.querySelectorAll('.carrousel-item');
  sliderCounter = 0;

  

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


