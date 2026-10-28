import { TestBed } from '@angular/core/testing';

import { FiliereService } from './filiere.service';

describe('FiliereService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiliereService = TestBed.inject(FiliereService);
    expect(service).toBeTruthy();
  });
});
