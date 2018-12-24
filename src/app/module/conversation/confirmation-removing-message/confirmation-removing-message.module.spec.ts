import {ConfirmationRemovingMessageModule} from './confirmation-removing-message.module';

describe('ConfirmationRemovingMessageModule', () => {
  let confirmationRemovingMessageModule: ConfirmationRemovingMessageModule;

  beforeEach(() => {
    confirmationRemovingMessageModule = new ConfirmationRemovingMessageModule();
  });

  it('should create an instance', () => {
    expect(confirmationRemovingMessageModule).toBeTruthy();
  });
});
