import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpvalidationComponent } from './sign-upvalidation.component';

describe('SignUpvalidationComponent', () => {
  let component: SignUpvalidationComponent;
  let fixture: ComponentFixture<SignUpvalidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpvalidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
