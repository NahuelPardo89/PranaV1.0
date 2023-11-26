import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './components/staff/staff.component';
// import { AgmCoreModule } from '@agm/core';




@NgModule({
  declarations: [
    StaffComponent
  ],
  imports: [
    CommonModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBphW12ssLTpdgl0LHX65NLCqrjqcanZbM'
    // })
    
  ]
})
export class HomeModule { }
