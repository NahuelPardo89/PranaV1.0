import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required,Validators.email]],
      
    });
  }
  

  onSubmit(): void {
    console.log(this.loginForm.value.email);
    this.authService.requestPasswordReset(this.loginForm.value.email)
  }
}
