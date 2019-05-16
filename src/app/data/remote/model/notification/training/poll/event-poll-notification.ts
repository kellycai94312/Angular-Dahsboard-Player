import {BaseNotification} from '../../base/base-notification';
import {NotificationType} from '../../base/notification-type';
import {PollPerson} from '../../../training/poll/poll-person';
import {EventPollNotificationType} from './event-poll-notification-type';

export class EventPollNotification extends BaseNotification {

  public eventPollNotificationType: EventPollNotificationType;
  public pollPerson: PollPerson;

  constructor() {
    super();
    this.discriminator = NotificationType.EVENT_POLL;
  }
}
