import {BaseMessageContent} from './base/base-message-content';
import {SystemMessageType} from './system-message-type';
import {Participant} from '../participant';
import {MessageContentType} from './base/message-content-type';
import {Type} from 'class-transformer';

export class SystemMessageContent extends BaseMessageContent {

  public systemMessageType: SystemMessageType;

  @Type(() => Participant)
  public object: Participant;

  constructor() {
    super();
    this.discriminator = MessageContentType.SYSTEM_MESSAGE_CONTENT;
  }

}
