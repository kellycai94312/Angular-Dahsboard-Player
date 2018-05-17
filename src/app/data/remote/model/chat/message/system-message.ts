import {BaseMessage} from './base/base-message';
import {SystemMessageType} from './system-message-type';
import {Participant} from '../participant';
import {BaseMessageType} from './base/base-message-type';

export class SystemMessage extends BaseMessage {
  public systemMessageType: SystemMessageType;
  public object: Participant;

  constructor() {
    super();
    this.discriminator = BaseMessageType.SYSTEM_MESSAGE;
  }
}
