import {BaseNotification} from '../../base/base-notification';
import {EventPollNotificationType} from './event-poll-notification-type';
import {PollPerson} from '../../../training/poll/poll-person';
import {Type} from 'class-transformer';
import {NotificationType} from '../../base/notification-type';

export class EventPollNotification extends BaseNotification {

  public eventPollNotificationType: EventPollNotificationType;

  @Type(() => PollPerson)
  public pollPerson: PollPerson;

  constructor() {
    super();
    this.discriminator = NotificationType.EVENT_POLL;
  }

}
