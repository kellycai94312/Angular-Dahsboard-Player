import { TestBed } from '@angular/core/testing';

import { OrganizationTypeApiService } from './organization-type-api.service';

describe('OrganizationTypeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizationTypeApiService = TestBed.get(OrganizationTypeApiService);
    expect(service).toBeTruthy();
  });
});
