import {BaseNotification} from '../../base/base-notification';
import {NotificationType} from '../../base/notification-type';

export class EventPollNotification extends BaseNotification {
  constructor() {
    super();
    this.discriminator = NotificationType.EVENT_POLL;
  }
}
