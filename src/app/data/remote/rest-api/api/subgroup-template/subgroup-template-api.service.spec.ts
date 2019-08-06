import {TestBed} from '@angular/core/testing';

import {SubgroupTemplateApiService} from './subgroup-template-api.service';

describe('SubgroupTemplateApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubgroupTemplateApiService = TestBed.get(SubgroupTemplateApiService);
    expect(service).toBeTruthy();
  });
});
