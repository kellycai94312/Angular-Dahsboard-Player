import {BaseNotification} from '../base/base-notification';
import {GroupNotificationType} from './group-notification-type';
import {NotificationType} from '../base/notification-type';
import {GroupPersonPosition} from '../../group/position/group-person-position';
import {Type} from 'class-transformer';

export class GroupNotification extends BaseNotification {

  public groupNotificationType: GroupNotificationType;

  //region Transient

  @Type(() => GroupPersonPosition)
  public positions?: GroupPersonPosition[];

  //endregion

  constructor() {
    super();
    this.discriminator = NotificationType.GROUP;
  }

}
