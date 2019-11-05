import { TestBed } from '@angular/core/testing';

import { SportTypeApiService } from './sport-type-api.service';

describe('SportTypeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SportTypeApiService = TestBed.get(SportTypeApiService);
    expect(service).toBeTruthy();
  });
});
