import {TestBed} from '@angular/core/testing';

import {SubgroupService} from './subgroup.service';

describe('SubgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubgroupService = TestBed.get(SubgroupService);
    expect(service).toBeTruthy();
  });
});
