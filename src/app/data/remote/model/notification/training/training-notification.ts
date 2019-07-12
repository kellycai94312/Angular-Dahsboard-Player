import {BaseNotification} from '../base/base-notification';
import {TrainingNotificationType} from './training-notification-type';
import {NotificationType} from '../base/notification-type';
import {BaseEvent} from '../../event/base/base-event';

export class TrainingNotification extends BaseNotification {
  public trainingNotificationType: TrainingNotificationType;
  // TODO: Update model
  public training: BaseEvent;

  constructor() {
    super();
    this.discriminator = NotificationType.TRAINING;
  }
}
