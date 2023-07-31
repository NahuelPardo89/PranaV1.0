import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
//Component imports
import { TalleresComponent } from './Modules/workshops/components/talleres/talleres.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { BannerComponent } from './Modules/home/components/banner/banner.component';
import { PageNotFoundComponent } from './Modules/shared/components/pagenotfound/pagenotfound.component';



const routes: Route[] = [
  { path: 'Home', component: BannerComponent },
  { path: 'Talleres', component: TalleresComponent },
  { path: 'AboutUs', component: QuienesSomosComponent },
  { path: '**', component: PageNotFoundComponent },
  
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Prana';

  constructor(private router: Router) {
    this.router.resetConfig(routes);
  }
}
