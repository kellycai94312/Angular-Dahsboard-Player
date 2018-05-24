import {Injectable} from '@angular/core';
import {StompConfig, StompRService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Observable} from 'rxjs/Observable';
import {ConversationReadRequest} from '../request/conversation-read-request';
import * as SockJS from 'sockjs-client';
import {PropertyConstant} from '../../local/property-constant';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ParticipantStompService {

  private readonly baseQuery: string = '/user/ws';
  private stompConfig: StompConfig;

  constructor(private _stompService: StompRService) {
  }

  public connect(): void {
    if (!this._stompService.connected()) {
      this.stompConfig = new StompConfig();
      this.stompConfig.url = new SockJS(PropertyConstant.wsUrl);
      this.stompConfig.headers = {};
      this.stompConfig.heartbeat_in = 0;
      this.stompConfig.heartbeat_out = 20000;
      this.stompConfig.reconnect_delay = 5000;
      this.stompConfig.debug = !environment.production;

      this._stompService.config = this.stompConfig;
      this._stompService.initAndConnect();
    }
  }

  public disconnect() {
    if (this._stompService.connected()) {
      this._stompService.disconnect();
    }
  }

  //#region Notification

  public subscribeNotification(): Observable<Message> {
    return this.subscribe(`${this.baseQuery}/notification`);
  }

  //#endregion

  //#region Conversation

  public subscribeConversation(): Observable<Message> {
    return this.subscribe(`${this.baseQuery}/conversation`);
  }

  public subscribeConversationRead(): Observable<Message> {
    return this.subscribe(`${this.baseQuery}/conversation/read`);
  }

  public subscribeConversationError(): Observable<Message> {
    return this.subscribe(`${this.baseQuery}/conversation/errors`);
  }

  public publishConversationRead(conversationReadRequest: ConversationReadRequest): void {
    this.publish('/ws/conversation/read', JSON.stringify(conversationReadRequest));
  }

  //#endregion

  private publish(queueName: string, message: string): boolean {
    try {
      this._stompService.publish(queueName, message);
      return true;
    } catch (e) {
    }
    return false;
  }

  private subscribe(queueName: string): Observable<Message> {
    try {
      return this._stompService.subscribe(queueName);
    } catch (e) {
    }
    return null;
  }

  public messageToObject<T>(message: Message): T {
    return JSON.parse(message.body) as T;
  }

}
