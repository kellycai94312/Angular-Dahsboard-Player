import {BaseConversation, ConversationType} from './base';

export class Dialogue extends BaseConversation {
  constructor() {
    super();
    this.discriminator = ConversationType.DIALOGUE;
  }
}
