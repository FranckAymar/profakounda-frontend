import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostionFormationsAdminComponent } from './propostion-formations-admin.component';

describe('PropostionFormationsAdminComponent', () => {
  let component: PropostionFormationsAdminComponent;
  let fixture: ComponentFixture<PropostionFormationsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostionFormationsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostionFormationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
