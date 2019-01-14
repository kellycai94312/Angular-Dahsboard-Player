import {GroupNotification} from '../../../remote/model/notification/group/group-notification';
import {GroupNotificationType} from '../../../remote/model/notification/group/group-notification-type';
import {BaseNotificationViewModel} from './base-notification-view-model';
import {GroupPersonPositionStateEnum} from '../../../remote/model/group/position/group-person-position-state-enum';
import {Position} from '../../../remote/model/person-position/position';
import {AppModule} from '../../../../app.module';
import {AppHelper} from '../../../../utils/app-helper';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {TemplateModalService} from '../../../../service/template-modal.service';

export class GroupNotificationViewModel extends BaseNotificationViewModel<GroupNotification> {

  private readonly _appHelper: AppHelper;
  private readonly _authorizationService: AuthorizationService;
  private readonly _templateModalService: TemplateModalService;

  constructor(data: GroupNotification) {
    super(data);
    this._appHelper = AppModule.injector.get(AppHelper);
    this._authorizationService = AppModule.injector.get(AuthorizationService);
    this._templateModalService = AppModule.injector.get(TemplateModalService);
  }

  async build(): Promise<void> {
    const group = `<a class="link" link="/group/${this.data.group.id}">${this.data.group.name}</a>`;

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
          positions: await this.getGroupPersonPositionsText(),
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
      case GroupNotificationType.UPDATE_POSITIONS:
        this.body = await this.translateService.get('groupNotification.updatePositionsParams', {
          group: group,
          sender: sender,
          positions: await this.getGroupPersonPositionsText()
        }).toPromise();
        break;
      case GroupNotificationType.UPDATE_POSITIONS_APPROVE:
        this.body = await this.translateService.get('groupNotification.updatePositionsApproveParams', {
          group: group,
          person: person
        }).toPromise();
        break;
      case GroupNotificationType.UPDATE_POSITIONS_REFUSE:
        this.body = await this.translateService.get('groupNotification.updatePositionsRefuseParams', {
          group: group,
          person: person
        }).toPromise();
        break;
    }
  }

  async preApprove(): Promise<boolean> {
    const result = await super.preApprove();
    if (result) {
      switch (this.data.groupNotificationType) {
        case GroupNotificationType.INVITE_PERSON:
        case GroupNotificationType.UPDATE_POSITIONS:
          return await this._templateModalService.addMissingUserRoles(await this.getGroupPersonPositions());
      }
    }
    return result;
  }

  private async getGroupPersonPositions(): Promise<Position[]> {
    return (await this.participantRestApiService.getGroupPersonPositions({}, {withState: true}, {
      groupId: this.data.group.id,
      personId: this.data.person.id
    })).list.filter(x => !x.state || x.state === GroupPersonPositionStateEnum.ADDED).map(x => x.position);
  }

  private async getGroupPersonPositionsText(): Promise<string> {
    const groupPersonPositions = (await this.getGroupPersonPositions()).map(x => x.name);
    let positions = '';
    for (let i = 0; i < groupPersonPositions.length; i++) {
      positions += `${groupPersonPositions[i]}`;
      if (i + 1 < groupPersonPositions.length) {
        positions += ', ';
      }
    }
    return positions;
  }

}
