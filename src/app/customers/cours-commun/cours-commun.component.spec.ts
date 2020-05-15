import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursCommunComponent } from './cours-commun.component';

describe('CoursCommunComponent', () => {
  let component: CoursCommunComponent;
  let fixture: ComponentFixture<CoursCommunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursCommunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursCommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
