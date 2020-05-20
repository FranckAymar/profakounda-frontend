import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCoursCommunAdminComponent } from './details-cours-commun-admin.component';

describe('DetailsCoursCommunAdminComponent', () => {
  let component: DetailsCoursCommunAdminComponent;
  let fixture: ComponentFixture<DetailsCoursCommunAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCoursCommunAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCoursCommunAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
