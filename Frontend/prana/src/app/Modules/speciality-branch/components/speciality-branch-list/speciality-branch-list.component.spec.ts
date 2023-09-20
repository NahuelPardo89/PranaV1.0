import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityBranchListComponent } from './speciality-branch-list.component';

describe('SpecialityBranchListComponent', () => {
  let component: SpecialityBranchListComponent;
  let fixture: ComponentFixture<SpecialityBranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialityBranchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialityBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
