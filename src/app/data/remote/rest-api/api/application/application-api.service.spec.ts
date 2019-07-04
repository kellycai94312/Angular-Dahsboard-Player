import {TestBed} from '@angular/core/testing';

import {ApplicationApiService} from './application-api.service';

describe('ApplicationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationApiService = TestBed.get(ApplicationApiService);
    expect(service).toBeTruthy();
  });
});
