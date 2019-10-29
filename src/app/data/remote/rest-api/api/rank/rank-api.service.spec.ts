import { TestBed } from '@angular/core/testing';

import { RankApiService } from './rank-api.service';

describe('RankApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RankApiService = TestBed.get(RankApiService);
    expect(service).toBeTruthy();
  });
});
