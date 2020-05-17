import { TestBed } from '@angular/core/testing';
import { CoursCommunAdminService } from './cours-commun-admin.service';


describe('CoursCommunAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursCommunAdminService = TestBed.get(CoursCommunAdminService);
    expect(service).toBeTruthy();
  });
});
