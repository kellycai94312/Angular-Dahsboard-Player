import {BaseConversation, ConversationType} from './base';
import {BaseEvent} from '../../event/base/base-event';
import {Type} from 'class-transformer';

export class Chat extends BaseConversation {

  public name: string;

  @Type(() => BaseEvent)
  public event: BaseEvent;

  constructor() {
    super();
    this.discriminator = ConversationType.CHAT;
  }

}
