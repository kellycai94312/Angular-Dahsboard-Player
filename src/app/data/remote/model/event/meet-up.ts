import {BaseEvent} from './base/base-event';
import {EventType} from './base/event-type';

export class MeetUp extends BaseEvent {
  constructor() {
    super();
    this.discriminator = EventType.MEET_UP;
  }
}
