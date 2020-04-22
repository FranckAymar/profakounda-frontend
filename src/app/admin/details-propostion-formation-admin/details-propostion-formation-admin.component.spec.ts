import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPropostionFormationAdminComponent } from './details-propostion-formation-admin.component';

describe('DetailsPropostionFormationAdminComponent', () => {
  let component: DetailsPropostionFormationAdminComponent;
  let fixture: ComponentFixture<DetailsPropostionFormationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPropostionFormationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPropostionFormationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
