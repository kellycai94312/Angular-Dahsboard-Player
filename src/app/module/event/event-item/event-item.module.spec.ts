import {EventItemModule} from './event-item.module';

describe('EventItemModule', () => {
  let eventItemModule: EventItemModule;

  beforeEach(() => {
    eventItemModule = new EventItemModule();
  });

  it('should create an instance', () => {
    expect(eventItemModule).toBeTruthy();
  });
});
