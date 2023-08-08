import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,9}$')]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      
    });
  }
  get dni() {
    return this.registerForm.get('dni');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }

  get email() {
    return this.registerForm.get('email');
  }
  onSubmit() {
    if (this.registerForm.valid) {
      // Aquí puedes agregar la lógica para manejar la autenticación.
      console.log('Formulario válido, enviando datos...');
    }
  }
}

