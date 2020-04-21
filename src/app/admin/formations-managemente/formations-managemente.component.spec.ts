import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsManagementeComponent } from './formations-managemente.component';

describe('FormationsManagementeComponent', () => {
  let component: FormationsManagementeComponent;
  let fixture: ComponentFixture<FormationsManagementeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationsManagementeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationsManagementeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
