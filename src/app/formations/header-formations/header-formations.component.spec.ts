import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFormationsComponent } from './header-formations.component';

describe('HeaderFormationsComponent', () => {
  let component: HeaderFormationsComponent;
  let fixture: ComponentFixture<HeaderFormationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFormationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
