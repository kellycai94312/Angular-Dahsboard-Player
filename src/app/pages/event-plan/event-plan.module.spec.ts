import {EventPlanModule} from './event-plan.module';

describe('EventPlanModule', () => {
  let eventPlanModule: EventPlanModule;

  beforeEach(() => {
    eventPlanModule = new EventPlanModule();
  });

  it('should create an instance', () => {
    expect(eventPlanModule).toBeTruthy();
  });
});
