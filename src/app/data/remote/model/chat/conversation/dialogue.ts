import {BaseConversation} from './base/base-conversation';
import {BaseConversationType} from './base/base-conversation-type';

export class Dialogue extends BaseConversation {
  constructor() {
    super();
    this.discrimination = BaseConversationType.DIALOGUE;
  }
}
