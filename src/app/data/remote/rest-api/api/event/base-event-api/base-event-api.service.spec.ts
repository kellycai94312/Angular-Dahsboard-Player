import {TestBed} from '@angular/core/testing';

import {BaseEventApiService} from './base-event-api.service';

describe('BaseEventApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseEventApiService = TestBed.get(BaseEventApiService);
    expect(service).toBeTruthy();
  });
});
