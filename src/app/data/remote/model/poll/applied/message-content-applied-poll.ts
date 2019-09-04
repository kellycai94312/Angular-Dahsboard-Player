import {BaseAppliedPoll} from './base/base-applied-poll';
import {PollMessageContent} from '../../chat/message/poll-message-content';
import {AppliedPollType} from './base/applied-poll-type';
import {Type} from 'class-transformer';

export class MessageContentAppliedPoll extends BaseAppliedPoll {

  @Type(() => PollMessageContent)
  public messageContent: PollMessageContent;

  constructor() {
    super();
    this.discriminator = AppliedPollType.MESSAGE_CONTENT;
  }
}
