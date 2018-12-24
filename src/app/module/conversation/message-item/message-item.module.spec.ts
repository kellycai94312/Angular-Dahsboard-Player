import {MessageItemModule} from './message-item.module';

describe('MessageItemModule', () => {
  let messageItemModule: MessageItemModule;

  beforeEach(() => {
    messageItemModule = new MessageItemModule();
  });

  it('should create an instance', () => {
    expect(messageItemModule).toBeTruthy();
  });
});
