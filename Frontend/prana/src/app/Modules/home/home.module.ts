import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './components/staff/staff.component';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { BrowserModule } from '@angular/platform-browser';




// import { AgmCoreModule } from '@agm/core';




@NgModule({
  declarations: [
    StaffComponent,
    EspecialidadesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  
    
    
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBphW12ssLTpdgl0LHX65NLCqrjqcanZbM'
    // })
    
  ]
})
export class HomeModule { }
