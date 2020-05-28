import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteRenduCourscommunComponent } from './compte-rendu-courscommun.component';

describe('CompteRenduCourscommunComponent', () => {
  let component: CompteRenduCourscommunComponent;
  let fixture: ComponentFixture<CompteRenduCourscommunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteRenduCourscommunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteRenduCourscommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
