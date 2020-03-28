import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileCustComponent } from './edit-profile-cust.component';

describe('EditProfileCustComponent', () => {
  let component: EditProfileCustComponent;
  let fixture: ComponentFixture<EditProfileCustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileCustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
