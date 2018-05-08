import {BaseNotification} from '../base/base-notification';
import {GroupNotificationType} from './group-notification-type';
import {NotificationType} from '../base/notification-type';

export class GroupNotification extends BaseNotification {
  public groupNotificationType: GroupNotificationType;

  constructor() {
    super();
    this.discriminator = NotificationType.GROUP;
  }
}
