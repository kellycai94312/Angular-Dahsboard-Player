import {BaseMessage} from './base/base-message';
import {BaseMessageType} from './base/base-message-type';

export class Message extends BaseMessage {
  constructor() {
    super();
    this.discriminator = BaseMessageType.MESSAGE;
  }
}
