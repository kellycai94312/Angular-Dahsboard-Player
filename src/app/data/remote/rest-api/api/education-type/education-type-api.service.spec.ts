import { TestBed } from '@angular/core/testing';

import { EducationTypeApiService } from './education-type-api.service';

describe('EducationTypeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EducationTypeApiService = TestBed.get(EducationTypeApiService);
    expect(service).toBeTruthy();
  });
});
