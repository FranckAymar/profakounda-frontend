import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorisPropositionComponent } from './favoris-proposition.component';

describe('FavorisPropositionComponent', () => {
  let component: FavorisPropositionComponent;
  let fixture: ComponentFixture<FavorisPropositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavorisPropositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorisPropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
