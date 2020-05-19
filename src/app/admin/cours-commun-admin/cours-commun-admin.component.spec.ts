import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursCommunAdminComponent } from './cours-commun-admin.component';

describe('CoursCommunAdminComponent', () => {
  let component: CoursCommunAdminComponent;
  let fixture: ComponentFixture<CoursCommunAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursCommunAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursCommunAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
