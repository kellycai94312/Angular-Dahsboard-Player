import {TestBed} from '@angular/core/testing';

import {PollApiService} from './poll-api.service';

describe('PollApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollApiService = TestBed.get(PollApiService);
    expect(service).toBeTruthy();
  });
});
