import {EventPersonItemModule} from './event-person-item.module';

describe('EventPersonItemModule', () => {
  let eventPersonItemModule: EventPersonItemModule;

  beforeEach(() => {
    eventPersonItemModule = new EventPersonItemModule();
  });

  it('should create an instance', () => {
    expect(eventPersonItemModule).toBeTruthy();
  });
});
