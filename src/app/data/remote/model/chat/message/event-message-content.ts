import {BaseMessageContent} from './base/base-message-content';
import {BaseTraining} from '../../training/base/base-training';
import {BaseMessageContentType} from './base/base-message-content-type';

export class EventMessageContent<T extends BaseTraining> extends BaseMessageContent {
  training: T;

  constructor() {
    super();
    this.discriminator = BaseMessageContentType.EVENT_MESSAGE_CONTENT;
  }
}
