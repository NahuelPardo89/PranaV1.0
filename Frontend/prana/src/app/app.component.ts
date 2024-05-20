import { Component } from '@angular/core';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Centro Terapéutico Prana';

 
  generatePDF() {
    const element = document.getElementById('pdfElement'); // Reemplaza 'pdfElement' con el ID de tu elemento HTML
    html2pdf().from(element).save('documento.pdf');
  }
  
}
