import {BaseMessageContent} from './base/base-message-content';
import {MessageContentType} from './base/message-content-type';

export class FileMessageContent extends BaseMessageContent {
  constructor() {
    super();
    this.discriminator = MessageContentType.FILE_MESSAGE_CONTENT;
  }
}
