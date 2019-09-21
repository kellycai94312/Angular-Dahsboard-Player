import { Type } from 'class-transformer';
import { BaseEvent, EVENT_TYPE_OPTIONS } from '../../event/base';
import { BaseConversation, ConversationType } from './base';

export class Chat extends BaseConversation {

  public name: string;

  @Type(() => BaseEvent, EVENT_TYPE_OPTIONS)
  public event: BaseEvent;

  constructor() {
    super();
    this.discriminator = ConversationType.CHAT;
  }

}
