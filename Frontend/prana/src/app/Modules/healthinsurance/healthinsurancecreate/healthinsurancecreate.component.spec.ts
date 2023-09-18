import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthinsurancecreateComponent } from './healthinsurancecreate.component';

describe('HealthinsurancecreateComponent', () => {
  let component: HealthinsurancecreateComponent;
  let fixture: ComponentFixture<HealthinsurancecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthinsurancecreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthinsurancecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
