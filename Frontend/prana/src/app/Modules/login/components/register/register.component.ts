import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/Models/registerUser.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,9}$')]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [Validators.required, Validators.minLength(8)]]
      
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
  get password() {
    return this.registerForm.get('password');
  }


  onSubmit() {
    if (this.registerForm.valid) {
      const userData: RegisterUser = this.registerForm.value;
      this.router.navigate(['Dashboard']);
      // Lógica para manejar el registro del usuario
      console.log('Enviando datos de usuario para registro:', userData);
    }
  }
}

