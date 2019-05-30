import {BaseEvent} from './base/base-event';
import {EventType} from './base/event-type';

export class Event extends BaseEvent {
  constructor() {
    super();
    this.discriminator = EventType.EVENT;
  }
}
