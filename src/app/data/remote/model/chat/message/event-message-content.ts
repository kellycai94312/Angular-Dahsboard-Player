import { Type } from 'class-transformer';
import { BaseEvent, EVENT_TYPE_OPTIONS } from '../../event/base';
import { BaseMessageContent, MessageContentType } from './base';

export class EventMessageContent extends BaseMessageContent {

  @Type(() => BaseEvent, EVENT_TYPE_OPTIONS)
  public training: BaseEvent;

  constructor() {
    super();
    this.discriminator = MessageContentType.EVENT_MESSAGE_CONTENT;
  }

}
