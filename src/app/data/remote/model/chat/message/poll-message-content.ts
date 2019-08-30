import {BaseMessageContent} from './base/base-message-content';
import {MessageContentAppliedPoll} from '../../poll/applied/message-content-applied-poll';
import {BaseMessageContentType} from './base/base-message-content-type';
import {Type} from 'class-transformer';

export class PollMessageContent extends BaseMessageContent {

  @Type(() => MessageContentAppliedPoll)
  public appliedPoll: MessageContentAppliedPoll;

  constructor() {
    super();
    this.discriminator = BaseMessageContentType.POLL_MESSAGE_CONTENT;
  }

}
