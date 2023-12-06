import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarCreateComponent } from './seminar-create.component';

describe('SeminarCreateComponent', () => {
  let component: SeminarCreateComponent;
  let fixture: ComponentFixture<SeminarCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminarCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
