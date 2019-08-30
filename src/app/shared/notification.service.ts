import {map, takeWhile} from 'rxjs/operators';
import {Injectable, OnDestroy} from '@angular/core';
import {NotificationWrapper} from '../data/remote/bean/wrapper/notification-wrapper';
import {Observable, Subject} from 'rxjs';
import {ParticipantStompService} from '../data/remote/web-socket/participant-stomp.service';
import {EventNotification} from '../data/remote/model/notification/event/event-notification';
import {EventPollNotification} from '../data/remote/model/notification/event/poll/event-poll-notification';
import {GroupNotification} from '../data/remote/model/notification/group/group-notification';
import {GroupConnectionNotification} from '../data/remote/model/notification/group/connection/group-connection-notification';
import {SubgroupNotification} from '../data/remote/model/notification/subgroup/subgroup-notification';
import {Person} from '../data/remote/model/person';
import {Group} from '../data/remote/model/group/base/group';
import {TranslateService} from '@ngx-translate/core';
import {BaseNotification} from '../data/remote/model/notification/base/base-notification';
import {GroupConnectionTypeEnum} from '../data/remote/model/group/connection/group-connection-type-enum';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {

  private readonly _notificationSubject = new Subject<NotificationWrapper>();
  private _notDestroyed = true;

  public get notification$(): Observable<NotificationWrapper> {
    return this._notificationSubject.asObservable();
  }

  constructor(private _participantStompService: ParticipantStompService,
              private _router: Router,
              private _translateService: TranslateService) {
  }

  public ngOnDestroy(): void {
    this.unsubscribe();
  }

  public subscribe() {
    this._notDestroyed = true;

    this._participantStompService.subscribeNotification()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<NotificationWrapper>(message))
      )
      .subscribe(async value => {
        this._notificationSubject.next(value);
      });
  }

  public unsubscribe() {
    delete this._notDestroyed;
  }

  public getNotificationContent(notification: BaseNotification): string {
    let params = {};
    let key: string;
    const sender = this._getLinkedPerson(notification.sender);
    const person = this._getLinkedPerson(notification.receiver);
    let group: string;
    if (notification.group) {
      group = this._getLinkedGroup(notification.group);
    }

    if (notification instanceof EventNotification) {
      const event = notification.event.name;

      key = `eventNotification.${notification.eventNotificationType}`;
      params = {sender, person, event, group};
    } else if (notification instanceof EventPollNotification) {
      const poll = notification.pollPerson.appliedPoll.pollVersion.name;

      key = `eventPollNotificationType.${notification.eventPollNotificationType}`;
      params = {poll, person};
    } else if (notification instanceof GroupNotification) {
      let positions: string;
      if (notification.positions) {
        positions = notification.positions.map(x => {
          let result = x.position.name;
          if (x.state) {
            result += ` (${this._translateService.instant(`groupPersonPositionStateEnum.${x.state}`)})`;
          }
          return result;
        }).join(', ');
      }

      key = `groupNotification.${notification.groupNotificationType}`;
      params = {sender, person, group, positions};
    } else if (notification instanceof GroupConnectionNotification) {
      let innerGroup: string;
      let parentGroup: string;

      if (notification.groupConnectionRequest.groupConnectionTypeEnum === GroupConnectionTypeEnum.REQUEST) {
        innerGroup = this._getLinkedGroup(notification.groupConnectionRequest.group);
        parentGroup = this._getLinkedGroup(notification.groupConnectionRequest.parentGroup);
      } else {
        innerGroup = this._getLinkedGroup(notification.groupConnectionRequest.parentGroup);
        parentGroup = this._getLinkedGroup(notification.groupConnectionRequest.group);
      }

      key = `groupConnectionNotificationType.${notification.groupConnectionNotificationType}`;
      params = {group: innerGroup, parentGroup};
    }
    if (notification instanceof SubgroupNotification) {
      const template = notification.subgroupTemplateGroup.subgroupTemplateGroupVersion.template.name;

      key = `subgroupNotificationType.${notification.subgroupNotificationType}`;
      params = {sender, template, group};
    }

    return this._translateService.instant(key, params);
  }

  public async navigateByNotificationContent(event: Event): Promise<boolean> {
    const target = event.target as HTMLElement;
    if (target && target.tagName.toLowerCase() === 'span') {
      const link = target.getAttribute('link');
      if (link) {
        await this._router.navigate([link]);
        return true;
      }
    }
    return false;
  }

  private _getLinkedObject(value: string, link: string): string {
    return `<span class="link" link="${link}">${value}</span>`;
  }

  private _getLinkedPerson(person: Person): string {
    return this._getLinkedObject(`${person.lastName} ${person.firstName}`, `/person/${person.id}`);
  }

  private _getLinkedGroup(group: Group): string {
    return this._getLinkedObject(group.name, `/group/${group.id}`);
  }

}
