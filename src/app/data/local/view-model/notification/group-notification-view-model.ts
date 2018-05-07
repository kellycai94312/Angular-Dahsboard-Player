import {GroupNotification} from '../../../remote/model/notification/group/group-notification';
import {GroupNotificationType} from '../../../remote/model/notification/group/group-notification-type';
import {BaseNotificationViewModel} from './base-notification-view-model';

export class GroupNotificationViewModel extends BaseNotificationViewModel<GroupNotification> {

  async build(): Promise<void> {
    const group = `<a class="link" link="/group/${this.data.group.id}}">${this.data.group.name}</a>`;

    let sender: string;
    if (this.data.sender) {
      sender = `<a class="link" link="/person/${this.data.sender.id}">${this.data.sender.firstName} ${this.data.sender.lastName} ${this.data.sender.patronymic}</a>`;
    }

    let person: string;
    if (this.data.person) {
      person = `<a class="link" link="/person/${this.data.person.id}">${this.data.person.firstName} ${this.data.person.lastName} ${this.data.person.patronymic}</a>`;
    }
    switch (this.data.groupNotificationType) {
      case GroupNotificationType.ADD_PERSON:
        this.body = await this.translateService.get('groupNotification.addPerson', {
          group: group,
          sender: sender,
          person: person
        }).toPromise();
        break;
      case GroupNotificationType.ADD_PERSON_SELF:
        this.body = await this.translateService.get('groupNotification.addPersonSelf', {
          group: group,
          sender: sender
        }).toPromise();
        break;
      case GroupNotificationType.DELETE_PERSON:
        this.body = await this.translateService.get('groupNotification.deletePerson', {
          group: group,
          sender: sender,
          person: person
        }).toPromise();
        break;
      case GroupNotificationType.DELETE_PERSON_SELF:
        this.body = await this.translateService.get('groupNotification.deletePersonSelf', {
          group: group,
          sender: sender
        }).toPromise();
        break;
      case GroupNotificationType.JOIN_PERSON:
        this.body = await this.translateService.get('groupNotification.joinPerson', {
          group: group,
          person: person
        }).toPromise();
        break;
    }
  }

}
