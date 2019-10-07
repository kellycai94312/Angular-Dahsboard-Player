import { TestBed } from '@angular/core/testing';

import { LibraryPermissionService } from './library-permission.service';

describe('LibraryPermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibraryPermissionService = TestBed.get(LibraryPermissionService);
    expect(service).toBeTruthy();
  });
});
