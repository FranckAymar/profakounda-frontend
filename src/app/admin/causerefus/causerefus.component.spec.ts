import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauserefusComponent } from './causerefus.component';

describe('CauserefusComponent', () => {
  let component: CauserefusComponent;
  let fixture: ComponentFixture<CauserefusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauserefusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauserefusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
