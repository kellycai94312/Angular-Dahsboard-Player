import {Injectable} from '@angular/core';
import {BaseNotification} from '../data/remote/model/notification/base/base-notification';
import {GroupNotification} from '../data/remote/model/notification/group/group-notification';
import {TrainingNotification} from '../data/remote/model/notification/training/training-notification';
import {NotificationType} from '../data/remote/model/notification/base/notification-type';
import {INotificationViewModel} from '../data/local/view-model/notification/i-notification-view-model';
import {GroupNotificationViewModel} from '../data/local/view-model/notification/group-notification-view-model';
import {TrainingNotificationViewModel} from '../data/local/view-model/notification/training-notification-view-model';

@Injectable()
export class NotificationService {

  constructor() {
  }

  public createNotificationViewModel(notification: BaseNotification): INotificationViewModel {
    switch (notification.discriminator) {
      case NotificationType.GROUP:
        return new GroupNotificationViewModel(notification as GroupNotification);
      case NotificationType.TRAINING:
        return new TrainingNotificationViewModel(notification as TrainingNotification);
    }
  }

}
