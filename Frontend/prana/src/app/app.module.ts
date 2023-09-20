import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Modules/shared/components/navbar/navbar.component';
import { BannerComponent } from './Modules/home/components/banner/banner.component';


import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { CardComponent } from './components/quienes-somos/card/card.component';
import { FooterComponent } from './Modules/shared/components/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeModule } from './Modules/home/home.module';
import { SharedModule } from './Modules/shared/shared.module';
import { WorkshopsModule } from './Modules/workshops/workshops.module';

import { DashboardModule } from './Modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './Services/auth/auth.interceptor';
import { MatSelectModule } from '@angular/material/select';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    QuienesSomosComponent,
    
    CardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    SharedModule,
    WorkshopsModule,
    MatSelectModule,
    DashboardModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
