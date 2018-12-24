import {BaseConversationPageModule} from './base-conversation-page.module';

describe('BaseConversationPageModule', () => {
  let baseConversationPageModule: BaseConversationPageModule;

  beforeEach(() => {
    baseConversationPageModule = new BaseConversationPageModule();
  });

  it('should create an instance', () => {
    expect(baseConversationPageModule).toBeTruthy();
  });
});
