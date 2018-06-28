import {MessageToastrModule} from './message-toastr.module';

describe('MessageToastrModule', () => {
  let messageToastrModule: MessageToastrModule;

  beforeEach(() => {
    messageToastrModule = new MessageToastrModule();
  });

  it('should create an instance', () => {
    expect(messageToastrModule).toBeTruthy();
  });
});
