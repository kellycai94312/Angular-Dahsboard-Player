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
      case GroupNotificationType.JOIN_PERSON:
        this.body = await this.translateService.get('groupNotification.joinPersonParams', {
          group: group,
          person: person
        }).toPromise();
        break;
      case GroupNotificationType.JOIN_PERSON_APPROVE:
        this.body = await this.translateService.get('groupNotification.joinPersonApproveParams', {
          group: group,
          sender: sender
        }).toPromise();
        break;
      case GroupNotificationType.JOIN_PERSON_REFUSE:
        this.body = await this.translateService.get('groupNotification.joinPersonRefuseParams', {
          group: group,
          sender: sender
        }).toPromise();
        break;
      case GroupNotificationType.INVITE_PERSON:
        this.body = await this.translateService.get('groupNotification.invitePersonParams', {
          group: group,
          sender: sender
        }).toPromise();
        break;
      case GroupNotificationType.INVITE_PERSON_APPROVE:
        this.body = await this.translateService.get('groupNotification.invitePersonApproveParams', {
          group: group,
          person: person
        }).toPromise();
        break;
      case GroupNotificationType.INVITE_PERSON_REFUSE:
        this.body = await this.translateService.get('groupNotification.invitePersonRefuseParams', {
          group: group,
          person: person
        }).toPromise();
        break;
      case GroupNotificationType.DELETE_PERSON:
        this.body = await this.translateService.get('groupNotification.deletePersonParams', {
          group: group,
          sender: sender
        }).toPromise();
        break;
    }
  }

}
