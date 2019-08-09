import {BaseNotification} from '../base/base-notification';
import {EventNotificationType} from './event-notification-type';
import {BaseEvent} from '../../event/base/base-event';
import {Type} from 'class-transformer';
import {EventPersonType} from '../../event/person/event-person-type';
import {NotificationType} from '../base/notification-type';

export class EventNotification extends BaseNotification {

  public eventNotificationType: EventNotificationType;

  @Type(() => BaseEvent)
  public event: BaseEvent;

  @Type(() => EventPersonType)
  public eventPersonType: EventPersonType;


  constructor() {
    super();
    this.discriminator = NotificationType.EVENT;
  }

}
