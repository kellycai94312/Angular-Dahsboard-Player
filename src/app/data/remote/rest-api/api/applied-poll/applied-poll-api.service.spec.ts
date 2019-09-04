import {TestBed} from '@angular/core/testing';

import {AppliedPollApiService} from './applied-poll-api.service';

describe('AppliedPollApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppliedPollApiService = TestBed.get(AppliedPollApiService);
    expect(service).toBeTruthy();
  });
});
