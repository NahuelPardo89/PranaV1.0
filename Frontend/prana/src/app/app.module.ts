import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BannerComponent } from './Modules/home/components/banner/banner.component';

import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { CardComponent } from './components/quienes-somos/card/card.component';
import { FooterComponent } from './Modules/shared/components/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeModule } from './Modules/home/home.module';
import { SharedModule } from './Modules/shared/shared.module';
import { ProfessionalsModule } from './Modules/professionals/professionals.module';

import { DashboardModule } from './Modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './Services/auth/auth.interceptor';
import { MatSelectModule } from '@angular/material/select';
import { ReportsModule } from './Modules/reports/reports.module';





// import { AgmCoreModule } from '@agm/core';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';



// Registrar la localización española (Argentina)
registerLocaleData(localeEsAr);

@NgModule({
  declarations: [
    AppComponent,

    BannerComponent,
    QuienesSomosComponent,

    CardComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    SharedModule,
    ProfessionalsModule,
    MatSelectModule,
    DashboardModule,
    BrowserAnimationsModule,
    ReportsModule,
    
    
   
    
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBphW12ssLTpdgl0LHX65NLCqrjqcanZbM'
    // })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-AR' },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
