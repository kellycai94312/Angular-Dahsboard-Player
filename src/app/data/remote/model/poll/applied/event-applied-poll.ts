import { Type } from 'class-transformer';
import { BaseEvent, EVENT_TYPE_OPTIONS } from '../../event/base';
import { AppliedPollType } from './base/applied-poll-type';
import { BaseAppliedPoll } from './base/base-applied-poll';

export class EventAppliedPoll extends BaseAppliedPoll {

  @Type(() => BaseEvent, EVENT_TYPE_OPTIONS)
  public event: BaseEvent;

  constructor() {
    super();
    this.discriminator = AppliedPollType.EVENT;
  }

}
