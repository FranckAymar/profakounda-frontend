import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommonCourseComponent } from './admin-common-course.component';

describe('AdminCommonCourseComponent', () => {
  let component: AdminCommonCourseComponent;
  let fixture: ComponentFixture<AdminCommonCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommonCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommonCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
