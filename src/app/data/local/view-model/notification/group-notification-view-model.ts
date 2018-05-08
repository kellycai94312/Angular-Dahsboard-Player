import {GroupNotification} from '../../../remote/model/notification/group/group-notification';
import {GroupNotificationType} from '../../../remote/model/notification/group/group-notification-type';
import {BaseNotificationViewModel} from './base-notification-view-model';

export class GroupNotificationViewModel extends BaseNotificationViewModel<GroupNotification> {

  async build(): Promise<void> {
    const group = `<a class="link" link="/group/${this.data.group.id}}">${this.data.group.name}</a>`;

    let sender: string;
    if (this.data.sender) {
      sender = this.getPersonLink(this.data.sender);
    }

    let person: string;
    if (this.data.person) {
      person = this.getPersonLink(this.data.person);
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
