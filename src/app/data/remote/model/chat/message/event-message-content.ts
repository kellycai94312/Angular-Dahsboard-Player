import {BaseMessageContent, MessageContentType} from './base';
import {BaseEvent} from '../../event/base/base-event';
import {Type} from 'class-transformer';

export class EventMessageContent extends BaseMessageContent {

  @Type(() => BaseEvent)
  public training: BaseEvent;

  constructor() {
    super();
    this.discriminator = MessageContentType.EVENT_MESSAGE_CONTENT;
  }

}
