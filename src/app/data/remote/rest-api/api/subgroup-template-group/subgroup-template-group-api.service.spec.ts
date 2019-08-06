import {TestBed} from '@angular/core/testing';

import {SubgroupTemplateGroupApiService} from './subgroup-template-group-api.service';

describe('SubgroupTemplateGroupApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubgroupTemplateGroupApiService = TestBed.get(SubgroupTemplateGroupApiService);
    expect(service).toBeTruthy();
  });
});
