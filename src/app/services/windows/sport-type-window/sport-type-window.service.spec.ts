import {TestBed} from '@angular/core/testing';

import {SportTypeWindowService} from './sport-type-window.service';

describe('SportTypeWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SportTypeWindowService = TestBed.get(SportTypeWindowService);
    expect(service).toBeTruthy();
  });
});
