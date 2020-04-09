import { TestBed } from '@angular/core/testing';

import { ListFormationsService } from './list-formations.service';

describe('ListFormationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListFormationsService = TestBed.get(ListFormationsService);
    expect(service).toBeTruthy();
  });
});
