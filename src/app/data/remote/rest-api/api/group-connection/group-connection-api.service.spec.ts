import { TestBed } from '@angular/core/testing';

import { GroupConnectionApiService } from './group-connection-api.service';

describe('GroupConnectionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupConnectionApiService = TestBed.get(GroupConnectionApiService);
    expect(service).toBeTruthy();
  });
});
