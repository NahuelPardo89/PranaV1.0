import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/Models/loginUser.interface';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,9}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  get dni() {
    return this.loginForm.get('dni');
  }

  get password() {
    return this.loginForm.get('password');
  }

  
  onSubmit() {
    if (this.loginForm.valid) {
      const userData: LoginUser = {
        dni: this.loginForm.value.dni,
        password: this.loginForm.value.password
      };
      this.router.navigate(['Dashboard'])
      
      // Llamar a la lógica de autenticación con los datos del usuario
      console.log('Enviando datos de usuario para autenticación:', userData);
    }
  }
}
