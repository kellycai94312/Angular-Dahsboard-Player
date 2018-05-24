import {IdentifiedObject} from '../../../base/identified-object';
import {Participant} from '../participant';
import {BaseMessageContent} from './base/base-message-content';

export class Message extends IdentifiedObject {
  sender: Participant;
  receiver: Participant;
  content: BaseMessageContent;
  read: boolean;
}
