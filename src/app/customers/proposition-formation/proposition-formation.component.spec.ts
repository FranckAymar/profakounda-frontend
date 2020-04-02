import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionFormationComponent } from './proposition-formation.component';

describe('PropositionFormationComponent', () => {
  let component: PropositionFormationComponent;
  let fixture: ComponentFixture<PropositionFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropositionFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropositionFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
