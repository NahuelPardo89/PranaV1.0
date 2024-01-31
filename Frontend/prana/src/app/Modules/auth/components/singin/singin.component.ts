import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/Models/user/registerUser.interface';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) {
    
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      dni: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(999000000)]],
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
      const nameInUpperCase = this.registerForm.get('name')?.value.toUpperCase();
      const lastNameInUpperCase = this.registerForm.get('last_name')?.value.toUpperCase();
      this.registerForm.get('name')?.setValue(nameInUpperCase);
      this.registerForm.get('last_name')?.setValue(lastNameInUpperCase);
      const userData: RegisterUser = this.registerForm.value;
  
      this.authService.register(userData).subscribe(
        response => {
          if (response.status === 201) {
            // Usuario registrado y autenticado con éxito, redirige al admin
            this.router.navigate(['/Dashboard']);
          } else {
            alert('Error inesperado durante el registro.');
          }
        },
        error => {
          // Muestra los errores de validación al usuario
          alert('Errores durante el registro: ' + error);
        }
      );
    }
  }
}
