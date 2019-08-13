import {TestBed} from '@angular/core/testing';

import {EventWindowService} from './event-window.service';

describe('EventWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventWindowService = TestBed.get(EventWindowService);
    expect(service).toBeTruthy();
  });
});
