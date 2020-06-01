import { TestBed } from '@angular/core/testing';

import { InscriptioncourscommunService } from './inscriptioncourscommun.service';

describe('InscriptioncourscommunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InscriptioncourscommunService = TestBed.get(InscriptioncourscommunService);
    expect(service).toBeTruthy();
  });
});
