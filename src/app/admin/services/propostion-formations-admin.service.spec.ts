import { TestBed } from '@angular/core/testing';

import { PropostionFormationsAdminService } from './propostion-formations-admin.service';

describe('PropostionFormationsAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropostionFormationsAdminService = TestBed.get(PropostionFormationsAdminService);
    expect(service).toBeTruthy();
  });
});
