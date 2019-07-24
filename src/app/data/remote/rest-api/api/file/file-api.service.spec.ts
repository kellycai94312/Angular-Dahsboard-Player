import {TestBed} from '@angular/core/testing';

import {FileApiService} from './file-api.service';

describe('FileApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileApiService = TestBed.get(FileApiService);
    expect(service).toBeTruthy();
  });
});
