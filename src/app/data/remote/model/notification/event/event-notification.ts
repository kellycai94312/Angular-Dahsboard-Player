import { Type } from 'class-transformer';
import { BaseEvent, EVENT_TYPE_OPTIONS } from '../../event/base';
import { EventPersonType } from '../../event/person/event-person-type';
import { BaseNotification } from '../base/base-notification';
import { NotificationType } from '../base/notification-type';
import { EventNotificationType } from './event-notification-type';

export class EventNotification extends BaseNotification {

  public eventNotificationType: EventNotificationType;

  @Type(() => BaseEvent, EVENT_TYPE_OPTIONS)
  public event: BaseEvent;

  @Type(() => EventPersonType)
  public eventPersonType: EventPersonType;

  constructor() {
    super();
    this.discriminator = NotificationType.EVENT;
  }

}
