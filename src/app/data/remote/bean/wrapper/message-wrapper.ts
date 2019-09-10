import {Message} from '../../model/chat/message';
import {Participant} from '../../model/chat';
import {Type} from 'class-transformer';

export class MessageWrapper {

  @Type(() => Message)
  public message: Message;

  @Type(() => Message)
  public previousMessage: Message;

  @Type(() => Participant)
  public participant: Participant;

  public unread: number;
  public empty: boolean;

}
