import {BaseNotification} from '../base/base-notification';
import {TrainingNotificationType} from './training-notification-type';
import {NotificationType} from '../base/notification-type';
import {BaseTraining} from '../../training/base/base-training';

export class TrainingNotification extends BaseNotification {
  public trainingNotificationType: TrainingNotificationType;
  public training: BaseTraining;

  constructor() {
    super();
    this.discriminator = NotificationType.TRAINING;
  }
}
