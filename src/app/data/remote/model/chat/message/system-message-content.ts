import {BaseMessageContent, MessageContentType} from './base';
import {SystemMessageType} from './system-message-type';
import {Participant} from '../participant';
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
