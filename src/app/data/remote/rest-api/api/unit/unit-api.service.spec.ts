import {TestBed} from '@angular/core/testing';

import {UnitApiService} from './unit-api.service';

describe('UnitApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitApiService = TestBed.get(UnitApiService);
    expect(service).toBeTruthy();
  });
});
