import { TestBed } from '@angular/core/testing';

import { ClaimStateApiService } from './claim-state-api.service';

describe('ClaimStateApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimStateApiService = TestBed.get(ClaimStateApiService);
    expect(service).toBeTruthy();
  });
});
