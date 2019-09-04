import {BaseMessageContent} from './base/base-message-content';
import {MessageContentType} from './base/message-content-type';

export class MessageContent extends BaseMessageContent {
  public updated: Date;
  public content: string;

  constructor() {
    super();
    this.discriminator = MessageContentType.MESSAGE_CONTENT;
  }
}
