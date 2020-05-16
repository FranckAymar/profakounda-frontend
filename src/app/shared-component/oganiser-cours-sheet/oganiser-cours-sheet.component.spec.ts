import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OganiserCoursSheetComponent } from './oganiser-cours-sheet.component';

describe('OganiserCoursSheetComponent', () => {
  let component: OganiserCoursSheetComponent;
  let fixture: ComponentFixture<OganiserCoursSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OganiserCoursSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OganiserCoursSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
