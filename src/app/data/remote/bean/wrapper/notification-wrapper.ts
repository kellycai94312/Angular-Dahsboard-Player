import {BaseNotification} from '../../model/notification/base/base-notification';
import {Type} from 'class-transformer';

export class NotificationWrapper {

  @Type(() => BaseNotification)
  public notification: BaseNotification;

  public unread?: number;

}
