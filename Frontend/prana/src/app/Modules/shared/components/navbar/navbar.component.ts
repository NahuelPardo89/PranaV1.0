
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginUser } from 'src/app/Models/user/loginUser.interface';
import { UserShort } from 'src/app/Models/user/userShort.interface';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: UserShort | null = null;
  loginForm!: FormGroup;
  isLogged: boolean = false;
  currentRole: string = "";

  isMenuOpen: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      dni: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(999000000)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    // También suscríbete al estado de autenticación aquí
    this.authService.isLogged.subscribe(logged => {
      this.isLogged = logged;
    });
    this.authService.getCurrentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.authService.getUserRole2().subscribe(role=>{
      this.currentRole = role;
      
    })
  }
 

  login(): void {
    if (this.loginForm.valid) {
      const user: LoginUser = this.loginForm.value;
      this.authService.login(user);
    }
  }

  register(): void {
    this.router.navigate(['singin']);
  }

  logout(): void {
    this.authService.logout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
