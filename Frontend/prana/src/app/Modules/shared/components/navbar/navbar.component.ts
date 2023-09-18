
import { Component, OnInit, OnDestroy,  } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserShort } from 'src/app/Models/userShort.interface';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public currentUser$!: Observable<UserShort | null>;

  constructor(public authService: AuthService,) {}

  ngOnInit() {
    this.currentUser$ = this.authService.getCurrentUser();
    
  }
}
