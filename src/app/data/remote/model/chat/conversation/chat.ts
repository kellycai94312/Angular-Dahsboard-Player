import {BaseConversation} from './base/base-conversation';
import {BaseConversationType} from './base/base-conversation-type';

export class Chat extends BaseConversation {
  public name: string;

  constructor() {
    super();
    this.discrimination = BaseConversationType.CHAT;
  }
}
