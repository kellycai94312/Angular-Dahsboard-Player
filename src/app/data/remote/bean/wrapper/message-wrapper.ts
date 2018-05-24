import {MessageStatus} from './message-status';
import {Message} from '../../model/chat/message/message';

export class MessageWrapper {
  public message: Message;
  public unread: number;
  public status: MessageStatus;
}
