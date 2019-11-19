import { GroupPersonTypeClaim } from 'app/data/remote/model/group/person';
import { GroupPersonPosition } from 'app/data/remote/model/group/position';
import { BaseNotification } from 'app/data/remote/model/notification/base/base-notification';
import { NotificationType } from 'app/data/remote/model/notification/base/notification-type';
import { Type } from 'class-transformer';
import { GroupNotificationType } from './group-notification-type';

export class GroupNotification extends BaseNotification {

  public groupNotificationType: GroupNotificationType;

  @Type(() => GroupPersonTypeClaim)
  private groupPersonTypeClaim: GroupPersonTypeClaim;

  //region Transient

  @Type(() => GroupPersonPosition)
  public positions?: GroupPersonPosition[];

  //endregion

  constructor() {
    super();
    this.discriminator = NotificationType.GROUP;
  }

}
