import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoctorProfileComponent } from './list-doctor-profile.component';

describe('ListDoctorProfileComponent', () => {
  let component: ListDoctorProfileComponent;
  let fixture: ComponentFixture<ListDoctorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDoctorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
