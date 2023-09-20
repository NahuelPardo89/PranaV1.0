import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmethodlistComponent } from './paymentmethodlist.component';

describe('PaymentmethodlistComponent', () => {
  let component: PaymentmethodlistComponent;
  let fixture: ComponentFixture<PaymentmethodlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentmethodlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentmethodlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
