import {GroupNotification} from '../../../remote/model/notification/group/group-notification';
import {GroupNotificationType} from '../../../remote/model/notification/group/group-notification-type';
import {BaseNotificationViewModel} from './base-notification-view-model';

export class GroupNotificationViewModel extends BaseNotificationViewModel<GroupNotification> {

  async build(): Promise<void> {
    switch (this.data.groupNotificationType) {
      case GroupNotificationType.ADD_PERSON:
        break;
      case GroupNotificationType.ADD_PERSON_SELF:
        break;
      case GroupNotificationType.DELETE_PERSON:
        break;
      case GroupNotificationType.DELETE_PERSON_SELF:
        break;
      case GroupNotificationType.JOIN_PERSON:
        break;
    }
  }

}
