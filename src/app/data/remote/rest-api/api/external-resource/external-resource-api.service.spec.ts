import {TestBed} from '@angular/core/testing';

import {ExternalResourceApiService} from './external-resource-api.service';

describe('ExternalResourceApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalResourceApiService = TestBed.get(ExternalResourceApiService);
    expect(service).toBeTruthy();
  });
});
