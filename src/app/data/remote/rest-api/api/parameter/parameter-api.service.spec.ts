import {TestBed} from '@angular/core/testing';

import {ParameterApiService} from './parameter-api.service';

describe('ParameterApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParameterApiService = TestBed.get(ParameterApiService);
    expect(service).toBeTruthy();
  });
});
