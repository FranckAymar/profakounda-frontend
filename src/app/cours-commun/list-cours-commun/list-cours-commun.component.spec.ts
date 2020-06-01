import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoursCommunComponent } from './list-cours-commun.component';

describe('ListCoursCommunComponent', () => {
  let component: ListCoursCommunComponent;
  let fixture: ComponentFixture<ListCoursCommunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCoursCommunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoursCommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
