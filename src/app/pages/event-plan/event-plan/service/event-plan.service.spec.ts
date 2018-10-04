import {TestBed} from '@angular/core/testing';

import {EventPlanService} from './event-plan.service';

describe('EventPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventPlanService = TestBed.get(EventPlanService);
    expect(service).toBeTruthy();
  });
});
