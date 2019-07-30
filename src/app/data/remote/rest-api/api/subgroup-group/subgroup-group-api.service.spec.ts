import {TestBed} from '@angular/core/testing';

import {SubgroupGroupApiService} from './subgroup-group-api.service';

describe('SubgroupGroupApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubgroupGroupApiService = TestBed.get(SubgroupGroupApiService);
    expect(service).toBeTruthy();
  });
});
