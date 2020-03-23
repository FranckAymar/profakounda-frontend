import { TestBed } from '@angular/core/testing';

import { ForfaitService } from './forfait.service';

describe('ForfaitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForfaitService = TestBed.get(ForfaitService);
    expect(service).toBeTruthy();
  });
});
