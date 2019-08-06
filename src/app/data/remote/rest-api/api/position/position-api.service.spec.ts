import {TestBed} from '@angular/core/testing';

import {PositionApiService} from './position-api.service';

describe('PositionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PositionApiService = TestBed.get(PositionApiService);
    expect(service).toBeTruthy();
  });
});
