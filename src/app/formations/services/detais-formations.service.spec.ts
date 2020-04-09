import { TestBed } from '@angular/core/testing';

import { DetaisFormationsService } from './detais-formations.service';

describe('DetaisFormationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetaisFormationsService = TestBed.get(DetaisFormationsService);
    expect(service).toBeTruthy();
  });
});
