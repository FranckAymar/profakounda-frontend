import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesCourscommunComponent } from './annonces-courscommun.component';

describe('AnnoncesCourscommunComponent', () => {
  let component: AnnoncesCourscommunComponent;
  let fixture: ComponentFixture<AnnoncesCourscommunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoncesCourscommunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncesCourscommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
