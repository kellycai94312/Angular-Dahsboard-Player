import {ConversationItemModule} from './conversation-item.module';

describe('ConversationItemModule', () => {
  let conversationItemModule: ConversationItemModule;

  beforeEach(() => {
    conversationItemModule = new ConversationItemModule();
  });

  it('should create an instance', () => {
    expect(conversationItemModule).toBeTruthy();
  });
});
