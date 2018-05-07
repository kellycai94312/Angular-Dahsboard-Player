import {TrainingNotificationType} from '../../../remote/model/notification/training/training-notification-type';
import {TrainingNotification} from '../../../remote/model/notification/training/training-notification';
import {BaseNotificationViewModel} from './base-notification-view-model';

export class TrainingNotificationViewModel extends BaseNotificationViewModel<TrainingNotification> {

  async build(): Promise<void> {
    const event = `<a class="link" link="/event/${this.data.training.id}/${this.data.training.discriminator.toLocaleLowerCase()}">${this.data.training.name}</a>`;
    switch (this.data.trainingNotificationType) {
      case TrainingNotificationType.SCHEDULED_EVENT :
        this.body = await this.translateService.get('trainingNotification.scheduledEvent', {event: event}).toPromise();
        break;
      case TrainingNotificationType.UPDATE_DATE :
        this.body = await this.translateService.get('trainingNotification.updateDate', {event: event}).toPromise();
        break;
      case TrainingNotificationType.UPDATE_LOCATION :
        this.body = await this.translateService.get('trainingNotification.updateLocation', {event: event}).toPromise();
        break;
      case TrainingNotificationType.UPDATE_EXERCISES :
        break;
      case TrainingNotificationType.ADD_PERSON :
        break;
      case TrainingNotificationType.ADD_GROUP :
        break;
      case TrainingNotificationType.DELETE_PERSON :
        break;
      case TrainingNotificationType.DELETE_PERSON_SELF :
        break;
      case TrainingNotificationType.DELETE_TRAINING :
        break;
      case TrainingNotificationType.APPROVE_PERSON :
        break;
      case TrainingNotificationType.APPROVE_GROUP :
        break;
      case TrainingNotificationType.REFUSE_PERSON :
        break;
      case TrainingNotificationType.REFUSE_GROUP :
        break;
    }
  }

}
