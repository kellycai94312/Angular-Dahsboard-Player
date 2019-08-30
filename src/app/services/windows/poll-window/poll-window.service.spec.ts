import {TestBed} from '@angular/core/testing';

import {PollWindowService} from './poll-window.service';

describe('PollWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollWindowService = TestBed.get(PollWindowService);
    expect(service).toBeTruthy();
  });
});
