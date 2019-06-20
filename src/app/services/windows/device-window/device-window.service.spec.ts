import {TestBed} from '@angular/core/testing';

import {DeviceWindowService} from './device-window.service';

describe('DeviceWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceWindowService = TestBed.get(DeviceWindowService);
    expect(service).toBeTruthy();
  });
});
