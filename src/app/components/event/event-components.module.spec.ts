import {EventComponentsModule} from './event-components.module';

describe('EventComponentsModule', () => {
  let eventComponentsModule: EventComponentsModule;

  beforeEach(() => {
    eventComponentsModule = new EventComponentsModule();
  });

  it('should create an instance', () => {
    expect(eventComponentsModule).toBeTruthy();
  });
});
