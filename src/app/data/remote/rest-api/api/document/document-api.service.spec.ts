import { TestBed } from '@angular/core/testing';

import { DocumentApiService } from './document-api.service';

describe('DocumentApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentApiService = TestBed.get(DocumentApiService);
    expect(service).toBeTruthy();
  });
});
