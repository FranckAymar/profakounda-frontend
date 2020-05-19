import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursCommunMainComponent } from './cours-commun-main.component';

describe('CoursCommunMainComponent', () => {
  let component: CoursCommunMainComponent;
  let fixture: ComponentFixture<CoursCommunMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursCommunMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursCommunMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
