import {BaseMessageContent} from './base/base-message-content';
import {BaseMessageContentType} from './base/base-message-content-type';

export class MessageContent extends BaseMessageContent {
  updated: Date;

  constructor() {
    super();
    this.discriminator = BaseMessageContentType.MESSAGE_CONTENT;
  }
}