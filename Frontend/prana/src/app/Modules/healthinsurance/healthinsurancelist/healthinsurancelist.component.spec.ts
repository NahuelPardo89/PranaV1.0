import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthinsurancelistComponent } from './healthinsurancelist.component';

describe('HealthinsurancelistComponent', () => {
  let component: HealthinsurancelistComponent;
  let fixture: ComponentFixture<HealthinsurancelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthinsurancelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthinsurancelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
