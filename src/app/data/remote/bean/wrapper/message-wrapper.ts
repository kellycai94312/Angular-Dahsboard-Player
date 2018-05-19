import {BaseMessage} from '../../model/chat/message/base/base-message';
import {MessageStatus} from './message-status';

export class MessageWrapper {
  public message: BaseMessage;
  public unread: number;
  public status: MessageStatus;
}
