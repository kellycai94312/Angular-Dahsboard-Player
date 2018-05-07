import {TrainingNotificationType} from '../../../remote/model/notification/training/training-notification-type';
import {TrainingNotification} from '../../../remote/model/notification/training/training-notification';
import {BaseNotificationViewModel} from './base-notification-view-model';

export class TrainingNotificationViewModel extends BaseNotificationViewModel<TrainingNotification> {

  async build(): Promise<void> {
    const event = `<a class="link" link="/event/${this.data.training.id}/${this.data.training.discriminator.toLocaleLowerCase()}">${this.data.training.name}</a>`;
    let sender: string;
    if (this.data.sender) {
      sender = this.getPersonLink(this.data.sender);
    }

    let person: string;
    if (this.data.person) {
      person = this.getPersonLink(this.data.person);
    }

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
        this.body = await this.translateService.get('trainingNotification.updateExercises', {event: event}).toPromise();
        break;
      case TrainingNotificationType.ADD_PERSON :
        this.body = await this.translateService.get('trainingNotification.addPerson', {event: event}).toPromise();
        break;
      case TrainingNotificationType.ADD_GROUP :
        this.body = await this.translateService.get('trainingNotification.addGroup', {event: event}).toPromise();
        break;
      case TrainingNotificationType.DELETE_PERSON :
        this.body = await this.translateService.get('trainingNotification.deletePerson', {
          event: event,
          sender: sender,
          person: person
        }).toPromise();
        break;
      case TrainingNotificationType.DELETE_PERSON_SELF :
        this.body = await this.translateService.get('trainingNotification.deletePersonSelf', {event: event, sender: sender}).toPromise();
        break;
      case TrainingNotificationType.DELETE_TRAINING :
        this.body = await this.translateService.get('trainingNotification.deleteTraining', {event: event, sender: sender}).toPromise();
        break;
      case TrainingNotificationType.APPROVE_PERSON :
        this.body = await this.translateService.get('trainingNotification.approvePerson', {event: event, person: person}).toPromise();
        break;
      case TrainingNotificationType.APPROVE_GROUP :
        // TODO: Not implemented in server
        break;
      case TrainingNotificationType.REFUSE_PERSON :
        this.body = await this.translateService.get('trainingNotification.refusePerson', {event: event, person: person}).toPromise();
        break;
      case TrainingNotificationType.REFUSE_GROUP :
        // TODO: Not implemented in server
        break;
    }
  }

}
