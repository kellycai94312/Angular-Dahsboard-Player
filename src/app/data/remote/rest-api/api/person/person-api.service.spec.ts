import {TestBed} from '@angular/core/testing';

import {PersonApiService} from './person-api.service';

describe('PersonApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonApiService = TestBed.get(PersonApiService);
    expect(service).toBeTruthy();
  });
});
