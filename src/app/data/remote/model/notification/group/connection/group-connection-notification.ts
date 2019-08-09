import {BaseNotification} from '../../base/base-notification';
import {NotificationType} from '../../base/notification-type';
import {GroupConnectionNotificationType} from './group-connection-notification-type';
import {Type} from 'class-transformer';
import {GroupConnectionRequest} from '../../../group/connection/group-connection-request';

export class GroupConnectionNotification extends BaseNotification {

  public groupConnectionNotificationType: GroupConnectionNotificationType;

  @Type(() => GroupConnectionRequest)
  public groupConnectionRequest?: GroupConnectionRequest;

  constructor() {
    super();
    this.discriminator = NotificationType.GROUP_CONNECTION;
  }

}
