import { TestBed } from '@angular/core/testing';

import { GroupPermissionService } from './group-permission.service';

describe('GroupPermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupPermissionService = TestBed.get(GroupPermissionService);
    expect(service).toBeTruthy();
  });
});
