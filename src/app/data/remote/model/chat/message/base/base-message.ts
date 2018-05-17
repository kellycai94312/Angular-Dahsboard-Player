import {IdentifiedObject} from '../../../../base/identified-object';
import {BaseMessageType} from './base-message-type';
import {Participant} from '../../participant';
import {MessageContent} from './message-content';
import {BaseConversation} from '../../conversation/base/base-conversation';

export class BaseMessage extends IdentifiedObject {
  public discriminator: BaseMessageType;
  public sender: Participant;
  public receiver: Participant;
  public baseConversation: BaseConversation;
  public content: MessageContent;
  public read: boolean;
}
