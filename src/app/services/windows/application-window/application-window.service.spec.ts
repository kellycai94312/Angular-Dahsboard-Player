import {TestBed} from '@angular/core/testing';

import {ApplicationWindowService} from './application-window.service';

describe('ApplicationWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationWindowService = TestBed.get(ApplicationWindowService);
    expect(service).toBeTruthy();
  });
});
