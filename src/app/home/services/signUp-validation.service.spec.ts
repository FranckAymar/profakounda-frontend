import { signUpvalidationService } from './signUp-validation.service';
import { TestBed } from '@angular/core/testing';

describe('signUpvalidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: signUpvalidationService = TestBed.get(signUpvalidationService);
    expect(service).toBeTruthy();
  });
});
