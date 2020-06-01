import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCustomersComponent } from './content-customers.component';

describe('ContentCustomersComponent', () => {
  let component: ContentCustomersComponent;
  let fixture: ComponentFixture<ContentCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
