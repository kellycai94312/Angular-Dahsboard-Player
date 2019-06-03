import {TestBed} from '@angular/core/testing';

import {EventUtilService} from './event-util.service';

describe('EventUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventUtilService = TestBed.get(EventUtilService);
    expect(service).toBeTruthy();
  });
});
