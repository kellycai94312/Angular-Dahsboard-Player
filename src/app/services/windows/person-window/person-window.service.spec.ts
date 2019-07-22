import {TestBed} from '@angular/core/testing';

import {PersonWindowService} from './person-window.service';

describe('PersonWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonWindowService = TestBed.get(PersonWindowService);
    expect(service).toBeTruthy();
  });
});
