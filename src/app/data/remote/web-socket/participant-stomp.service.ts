import { Injectable } from '@angular/core';
import { StompConfig, StompRService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../../environments/environment';
import { ConversationReadRequest } from '../request/conversation-read-request';
import { IdRequest } from '../request/id-request';

@Injectable({
  providedIn: 'root'
})
export class ParticipantStompService {

  private readonly baseQuery: string = '/user/ws';
  private stompConfig: StompConfig;

  constructor(private _stompService: StompRService) {
  }

  public connect(): void {
    if (!this._stompService.connected()) {
      this.stompConfig = new StompConfig();
      this.stompConfig.url = () => {
        return new SockJS(environment.wsUrl);
      };
      this.stompConfig.headers = {};
      this.stompConfig.heartbeat_in = 0;
      this.stompConfig.heartbeat_out = 20000;
      this.stompConfig.reconnect_delay = 5000;
      this.stompConfig.debug = !environment.production;

      this._stompService.config = this.stompConfig;
      this._stompService.initAndConnect();
    }
  }

  public disconnect(): void {
    if (this._stompService.connected()) {
      this._stompService.disconnect();
    }
  }

  //#region Notification

  public subscribeNotification(): Observable<Message> {
    return this._subscribe(`${this.baseQuery}/notification`);
  }

  //#endregion

  //#region Conversation

  public subscribeConversationCreate(): Observable<Message> {
    return this._subscribe(`${this.baseQuery}/conversation/create`);
  }

  public subscribeConversationUpdate(): Observable<Message> {
    return this._subscribe(`${this.baseQuery}/conversation/update`);
  }

  public subscribeConversationDelete(): Observable<Message> {
    return this._subscribe(`${this.baseQuery}/conversation/delete`);
  }

  public subscribeConversationRead(): Observable<Message> {
    return this._subscribe(`${this.baseQuery}/conversation/read`);
  }

  public subscribeConversationTyping(): Observable<Message> {
    return this._subscribe(`${this.baseQuery}/conversation/typing`);
  }

  public publishConversationTyping(conversationId: IdRequest): void {
    this._publish('/ws/conversation/typing', JSON.stringify(conversationId));
  }

  public subscribeError(): Observable<Message> {
    return this._subscribe(`${this.baseQuery}/error`);
  }

  public subscribeConversationUnreadTotal(): Observable<Message> {
    return this._subscribe(`${this.baseQuery}/conversation/unread/total`);
  }

  public publishConversationRead(conversationReadRequest: ConversationReadRequest): void {
    this._publish('/ws/conversation/read', JSON.stringify(conversationReadRequest));
  }

  //#endregion

  public messageToObject<T>(cls: ClassType<T>, message: Message): T {
    return plainToClass(cls, JSON.parse(message.body));
  }

  private _publish(queueName: string, message: string): boolean {
    try {
      this._stompService.publish(queueName, message);
      return true;
    } catch (e) {
    }
    return false;
  }

  private _subscribe(queueName: string): Observable<Message> {
    return this._stompService.subscribe(queueName);
  }

}
