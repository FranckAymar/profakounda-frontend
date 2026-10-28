import { signUpvalidationService } from './signUp-validation.service';
import { TestBed } from '@angular/core/testing';

describe('signUpvalidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: signUpvalidationService = TestBed.inject(signUpvalidationService);
    expect(service).toBeTruthy();
  });
});
