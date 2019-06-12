import {TestBed} from '@angular/core/testing';

import {ParameterWindowService} from './parameter-window.service';

describe('ParameterWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParameterWindowService = TestBed.get(ParameterWindowService);
    expect(service).toBeTruthy();
  });
});
