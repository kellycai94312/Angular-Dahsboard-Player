import { TestBed } from '@angular/core/testing';

import { GroupConnectionRequestApiService } from './group-connection-request-api.service';

describe('GroupConnectionRequestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupConnectionRequestApiService = TestBed.get(GroupConnectionRequestApiService);
    expect(service).toBeTruthy();
  });
});
