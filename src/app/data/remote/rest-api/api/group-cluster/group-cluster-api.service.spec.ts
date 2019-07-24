import {TestBed} from '@angular/core/testing';

import {GroupClusterApiService} from './group-cluster-api.service';

describe('GroupClusterApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupClusterApiService = TestBed.get(GroupClusterApiService);
    expect(service).toBeTruthy();
  });
});
