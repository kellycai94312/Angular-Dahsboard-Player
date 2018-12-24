import {ConversationsPageModule} from './conversations-page.module';

describe('ConversationsPageModule', () => {
  let conversationsPageModule: ConversationsPageModule;

  beforeEach(() => {
    conversationsPageModule = new ConversationsPageModule();
  });

  it('should create an instance', () => {
    expect(conversationsPageModule).toBeTruthy();
  });
});
