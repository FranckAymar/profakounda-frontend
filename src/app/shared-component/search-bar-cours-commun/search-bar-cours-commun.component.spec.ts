import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarCoursCommunComponent } from './search-bar-cours-commun.component';

describe('SearchBarCoursCommunComponent', () => {
  let component: SearchBarCoursCommunComponent;
  let fixture: ComponentFixture<SearchBarCoursCommunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarCoursCommunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarCoursCommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
