import { TestBed } from '@angular/core/testing';

import { CoursCommunServiceService } from './cours-commun-service.service';

describe('CoursCommunServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursCommunServiceService = TestBed.get(CoursCommunServiceService);
    expect(service).toBeTruthy();
  });
});
