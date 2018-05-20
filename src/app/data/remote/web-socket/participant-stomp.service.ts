import {Injectable} from '@angular/core';
import {StompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Observable} from 'rxjs/Observable';
import {ConversationReadRequest} from '../request/conversation-read-request';

@Injectable()
export class ParticipantStompService {

  private readonly baseQuery: string = '/user/ws';

  constructor(private _stompService: StompService) {
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

  public publishConversationRead(conversationReadRequest: ConversationReadRequest): void {
    this.publish(`${this.baseQuery}/conversation/read`, JSON.stringify(conversationReadRequest));
  }

  //#endregion

  private publish(queueName: string, message: string) {
    try {
      this._stompService.publish(queueName, message);
    } catch (e) {
    }
  }

  private subscribe(queueName: string): Observable<Message> {
    return this._stompService.subscribe(queueName);
  }

  public messageToObject<T>(message: Message): T {
    return JSON.parse(message.body) as T;
  }

}
