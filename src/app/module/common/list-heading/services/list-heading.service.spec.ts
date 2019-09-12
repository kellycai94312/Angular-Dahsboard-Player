import {TestBed} from '@angular/core/testing';

import {ListHeadingService} from './list-heading.service';

describe('ListHeadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListHeadingService = TestBed.get(ListHeadingService);
    expect(service).toBeTruthy();
  });
});
