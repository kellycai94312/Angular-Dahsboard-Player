import {EventPlanRoutingModule} from './event-plan-routing.module';

describe('EventPlanRoutingModule', () => {
  let eventPlanRoutingModule: EventPlanRoutingModule;

  beforeEach(() => {
    eventPlanRoutingModule = new EventPlanRoutingModule();
  });

  it('should create an instance', () => {
    expect(eventPlanRoutingModule).toBeTruthy();
  });
});
