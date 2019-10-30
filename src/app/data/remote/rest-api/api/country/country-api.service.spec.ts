import { TestBed } from '@angular/core/testing';

import { CountryApiService } from './country-api.service';

describe('CountryApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryApiService = TestBed.get(CountryApiService);
    expect(service).toBeTruthy();
  });
});
