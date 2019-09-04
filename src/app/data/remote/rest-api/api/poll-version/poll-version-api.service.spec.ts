import {TestBed} from '@angular/core/testing';

import {PollVersionApiService} from './poll-version-api.service';

describe('PollVersionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollVersionApiService = TestBed.get(PollVersionApiService);
    expect(service).toBeTruthy();
  });
});
