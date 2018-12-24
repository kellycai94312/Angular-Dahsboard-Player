import {EditChatModule} from './edit-chat.module';

describe('EditChatModule', () => {
  let editChatModule: EditChatModule;

  beforeEach(() => {
    editChatModule = new EditChatModule();
  });

  it('should create an instance', () => {
    expect(editChatModule).toBeTruthy();
  });
});
