import { TestBed } from '@angular/core/testing';

import { CompanyTypeApiService } from './company-type-api.service';

describe('CompanyTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyTypeApiService = TestBed.get(CompanyTypeApiService);
    expect(service).toBeTruthy();
  });
});
