import {ConversationPageModule} from './conversation-page.module';

describe('ConversationPageModule', () => {
  let conversationPageModule: ConversationPageModule;

  beforeEach(() => {
    conversationPageModule = new ConversationPageModule();
  });

  it('should create an instance', () => {
    expect(conversationPageModule).toBeTruthy();
  });
});
