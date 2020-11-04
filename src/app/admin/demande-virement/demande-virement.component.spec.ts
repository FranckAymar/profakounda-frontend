import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeVirementComponent } from './demande-virement.component';

describe('DemandeVirementComponent', () => {
  let component: DemandeVirementComponent;
  let fixture: ComponentFixture<DemandeVirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeVirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeVirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
