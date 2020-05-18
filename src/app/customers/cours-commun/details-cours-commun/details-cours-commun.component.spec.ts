import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCoursCommunComponent } from './details-cours-commun.component';

describe('DetailsCoursCommunComponent', () => {
  let component: DetailsCoursCommunComponent;
  let fixture: ComponentFixture<DetailsCoursCommunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCoursCommunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCoursCommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
