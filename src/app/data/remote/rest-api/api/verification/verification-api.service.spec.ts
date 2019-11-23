import { TestBed } from '@angular/core/testing';

import { VerificationApiService } from './verification-api.service';

describe('VerificationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerificationApiService = TestBed.get(VerificationApiService);
    expect(service).toBeTruthy();
  });
});
