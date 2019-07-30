import {TestBed} from '@angular/core/testing';

import {SubgroupTemplateGroupVersionApiService} from './subgroup-template-group-version-api.service';

describe('SubgroupTemplateGroupVersionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubgroupTemplateGroupVersionApiService = TestBed.get(SubgroupTemplateGroupVersionApiService);
    expect(service).toBeTruthy();
  });
});
