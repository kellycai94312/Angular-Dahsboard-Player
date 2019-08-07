import {TestBed} from '@angular/core/testing';

import {GroupWindowService} from './group-window.service';

describe('GroupWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupWindowService = TestBed.get(GroupWindowService);
    expect(service).toBeTruthy();
  });
});
