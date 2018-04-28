import {BaseNotification} from '../base/base-notification';
import {TrainingNotificationType} from './training-notification-type';
import {NotificationType} from '../base/notification-type';

export class TrainingNotification extends BaseNotification {
  public trainingNotificationType: TrainingNotificationType;

  constructor() {
    super();
    this.discriminator = NotificationType.TRAINING;
  }
}
