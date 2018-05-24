import {BaseMessageContent} from './base/base-message-content';
import {SystemMessageContentType} from './system-message-content-type';
import {Participant} from '../participant';
import {BaseMessageContentType} from './base/base-message-content-type';

export class SystemMessageContent extends BaseMessageContent {
  systemMessageType: SystemMessageContentType;
  object: Participant;

  constructor() {
    super();
    this.discriminator = BaseMessageContentType.SYSTEM_MESSAGE_CONTENT;
  }
}
