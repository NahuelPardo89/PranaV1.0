import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeDoctorProfileComponent } from './me-doctor-profile.component';

describe('MeDoctorProfileComponent', () => {
  let component: MeDoctorProfileComponent;
  let fixture: ComponentFixture<MeDoctorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeDoctorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeDoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
