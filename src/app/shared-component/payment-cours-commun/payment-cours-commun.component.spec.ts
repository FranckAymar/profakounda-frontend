import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCoursCommunComponent } from './payment-cours-commun.component';

describe('PaymentCoursCommunComponent', () => {
  let component: PaymentCoursCommunComponent;
  let fixture: ComponentFixture<PaymentCoursCommunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCoursCommunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCoursCommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
