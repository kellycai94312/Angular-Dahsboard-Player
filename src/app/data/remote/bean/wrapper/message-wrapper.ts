import {Message} from '../../model/chat/message/message';
import {Participant} from '../../model/chat/participant';

export class MessageWrapper {
  public message: Message;
  public participant: Participant;
  public unread: number;
  public empty: boolean;
}
