import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnoncesFormationComponent } from './anonces-formation.component';

describe('AnoncesFormationComponent', () => {
  let component: AnoncesFormationComponent;
  let fixture: ComponentFixture<AnoncesFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnoncesFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnoncesFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
