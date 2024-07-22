import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewletterService } from 'src/app/Services/newletter/newletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  newletterForm!: FormGroup;
  constructor(private newLetterService: NewletterService,private fb: FormBuilder){
    
  }

  ngOnInit() {
    this.newletterForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
 
      
    });
  }

  get email() {
    return this.newletterForm.get('email');
  }
  
  suscribe(){
    console.log(this.newletterForm.value)
  }
}
