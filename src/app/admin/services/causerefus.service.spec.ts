import { TestBed } from '@angular/core/testing';

import { CauserefusService } from './causerefus.service';

describe('CauserefusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CauserefusService = TestBed.get(CauserefusService);
    expect(service).toBeTruthy();
  });
});
