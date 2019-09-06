import {BaseMessageContent, MessageContentType} from './base';

export class FileMessageContent extends BaseMessageContent {
  constructor() {
    super();
    this.discriminator = MessageContentType.FILE_MESSAGE_CONTENT;
  }
}
