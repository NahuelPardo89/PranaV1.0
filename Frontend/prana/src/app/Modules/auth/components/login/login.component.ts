import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtResponse } from 'src/app/Models/jwtResponse.interface';
import { LoginUser } from 'src/app/Models/loginUser.interface';
import { AuthService } from 'src/app/Services/auth/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      dni: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(999000000)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      
      let user: LoginUser = this.loginForm.value as LoginUser;
      user.dni = Number(user.dni);
      
      this.authService.login(user).subscribe({
        next: (response: JwtResponse) => {
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigateByUrl('/dashboard');
        },
        error: (error) => {
          window.alert('Usuario o contraseña incorrecto ')
          console.log(error);
        }
      });
    }
  }
}
