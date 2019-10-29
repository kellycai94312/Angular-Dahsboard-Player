import { BaseGroupConnectionRequest } from 'app/data/remote/model/group/connection/base-group-connection-request';
import { GROUP_CONNECTION_REQUEST_TYPE_OPTIONS } from 'app/data/remote/model/group/connection/group-connection-request-type-options';
import { BaseNotification } from 'app/data/remote/model/notification/base/base-notification';
import { NotificationType } from 'app/data/remote/model/notification/base/notification-type';
import { Type } from 'class-transformer';
import { GroupConnectionNotificationType } from './group-connection-notification-type';

export class GroupConnectionNotification extends BaseNotification {

  public groupConnectionNotificationType: GroupConnectionNotificationType;

  @Type(() => BaseGroupConnectionRequest, GROUP_CONNECTION_REQUEST_TYPE_OPTIONS)
  public groupConnectionRequest?: BaseGroupConnectionRequest;

  constructor() {
    super();
    this.discriminator = NotificationType.GROUP_CONNECTION;
  }

}
