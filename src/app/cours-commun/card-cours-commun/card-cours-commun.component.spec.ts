import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCoursCommunComponent } from './card-cours-commun.component';

describe('CardCoursCommunComponent', () => {
  let component: CardCoursCommunComponent;
  let fixture: ComponentFixture<CardCoursCommunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCoursCommunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCoursCommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
