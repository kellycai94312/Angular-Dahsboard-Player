import {TestBed} from '@angular/core/testing';

import {UnitWindowService} from './unit-window.service';

describe('UnitWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitWindowService = TestBed.get(UnitWindowService);
    expect(service).toBeTruthy();
  });
});
