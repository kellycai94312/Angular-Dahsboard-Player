import {BaseConversation} from './base/base-conversation';
import {ConversationType} from './base/conversation-type';

export class Dialogue extends BaseConversation {
  constructor() {
    super();
    this.discriminator = ConversationType.DIALOGUE;
  }
}
