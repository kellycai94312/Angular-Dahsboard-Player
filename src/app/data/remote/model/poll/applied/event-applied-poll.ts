import {BaseAppliedPoll} from './base/base-applied-poll';
import {BaseEvent} from '../../event/base/base-event';
import {AppliedPollType} from './base/applied-poll-type';
import {Type} from 'class-transformer';

export class EventAppliedPoll extends BaseAppliedPoll {

  @Type(() => BaseEvent)
  public event: BaseEvent;

  constructor() {
    super();
    this.discriminator = AppliedPollType.EVENT;
  }

}
