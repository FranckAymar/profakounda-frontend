import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllConsultationsCustomersComponent } from './all-consultations-customers.component';

describe('AllConsultationsCustomersComponent', () => {
  let component: AllConsultationsCustomersComponent;
  let fixture: ComponentFixture<AllConsultationsCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllConsultationsCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllConsultationsCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
