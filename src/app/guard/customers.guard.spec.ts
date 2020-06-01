import { TestBed, async, inject } from '@angular/core/testing';

import { CustomersGuard } from './customers.guard';

describe('CustomersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomersGuard]
    });
  });

  it('should ...', inject([CustomersGuard], (guard: CustomersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
