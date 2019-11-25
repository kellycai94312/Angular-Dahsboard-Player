import { TestBed } from '@angular/core/testing';

import { GroupConnectionRequestClaimApiService } from './group-connection-request-claim-api.service';

describe('GroupConnectionRequestClaimApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupConnectionRequestClaimApiService = TestBed.get(GroupConnectionRequestClaimApiService);
    expect(service).toBeTruthy();
  });
});
