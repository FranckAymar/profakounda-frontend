import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsMainComponent } from './formations-main.component';

describe('FormationsMainComponent', () => {
  let component: FormationsMainComponent;
  let fixture: ComponentFixture<FormationsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
