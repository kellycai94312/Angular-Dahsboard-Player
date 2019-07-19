import {BaseMessageContent} from './base/base-message-content';
import {BaseMessageContentType} from './base/base-message-content-type';
import {BaseEvent} from '../../event/base/base-event';

export class EventMessageContent<T extends BaseEvent> extends BaseMessageContent {
  training: T;

  constructor() {
    super();
    this.discriminator = BaseMessageContentType.EVENT_MESSAGE_CONTENT;
  }
}
