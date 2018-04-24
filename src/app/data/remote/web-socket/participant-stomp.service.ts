import {Injectable} from '@angular/core';
import {StompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {IdentifiedObject} from '../base/identified-object';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ParticipantStompService {

  constructor(private _stompService: StompService) {
  }

  //#region Notification

  public subscribeNotification(): Observable<Message> {
    return this._stompService.subscribe('/user/notification');
  }

  //#endregion

  public messageToObject<T extends IdentifiedObject>(message: Message): T {
    return JSON.parse(message.body) as T;
  }

}
