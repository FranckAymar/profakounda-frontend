import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInscritsComponent } from './details-inscrits.component';

describe('DetailsInscritsComponent', () => {
  let component: DetailsInscritsComponent;
  let fixture: ComponentFixture<DetailsInscritsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsInscritsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInscritsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
