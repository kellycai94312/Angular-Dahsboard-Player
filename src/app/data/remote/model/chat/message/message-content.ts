import {BaseMessageContent, MessageContentType} from './base';

export class MessageContent extends BaseMessageContent {
  public updated: Date;
  public content: string;

  constructor() {
    super();
    this.discriminator = MessageContentType.MESSAGE_CONTENT;
  }
}
