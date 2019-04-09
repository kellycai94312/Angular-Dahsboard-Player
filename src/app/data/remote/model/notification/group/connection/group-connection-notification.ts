import {BaseNotification} from '../../base/base-notification';
import {NotificationType} from '../../base/notification-type';
import {GroupConnectionNotificationType} from './group-connection-notification-type';
import {GroupCluster} from '../../../group/connection/group-cluster';

export class GroupConnectionNotification extends BaseNotification {
  constructor(public groupConnectionNotificationType: GroupConnectionNotificationType,
              public groupCluster: GroupCluster) {
    super();
    this.discriminator = NotificationType.GROUP_CONNECTION;
  }
}
