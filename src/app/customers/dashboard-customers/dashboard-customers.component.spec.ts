import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomersComponent } from './dashboard-customers.component';

describe('DashboardCustomersComponent', () => {
  let component: DashboardCustomersComponent;
  let fixture: ComponentFixture<DashboardCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
