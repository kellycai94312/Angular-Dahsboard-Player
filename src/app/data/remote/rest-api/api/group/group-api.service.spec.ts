import {TestBed} from '@angular/core/testing';

import {GroupApiService} from './group-api.service';

describe('GroupApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupApiService = TestBed.get(GroupApiService);
    expect(service).toBeTruthy();
  });
});
