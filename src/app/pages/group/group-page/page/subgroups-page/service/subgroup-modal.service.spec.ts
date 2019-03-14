import {TestBed} from '@angular/core/testing';

import {SubgroupModalService} from './subgroup-modal.service';

describe('SubgroupModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubgroupModalService = TestBed.get(SubgroupModalService);
    expect(service).toBeTruthy();
  });
});
