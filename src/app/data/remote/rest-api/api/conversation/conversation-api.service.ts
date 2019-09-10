import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {ApiService} from '../base/api.service';
import {Observable} from 'rxjs';
import {BaseConversation} from '../../../model/chat/conversation/base';
import {BaseMessageContent} from '../../../model/chat/message/base';
import {Message, MessageContent} from '../../../model/chat/message';
import {PageQuery} from '../../page-query';
import {MessageWrapper} from '../../../bean/wrapper/message-wrapper';
import {PageContainer} from '../../../bean/page-container';
import {IntegerWrapper} from '../../../bean/wrapper/integer-wrapper';
import {map} from 'rxjs/operators';
import {ListRequest} from '../../../request/list-request';
import {IdRequest} from '../../../request/id-request';
import {BooleanWrapper} from '../../../bean/wrapper/boolean-wrapper';
import {Chat, Participant} from '../../../model/chat';
import {ConversationQuery} from '../../query/conversation-query';
import {Person} from '../../../model/person';
import {ChatRequest} from '../../../request/chat-request';

@Injectable({
  providedIn: 'root'
})
export class ConversationApiService {

  private readonly _basePath = `${environment.restUrl}/conversation`;

  constructor(private _apiService: ApiService) {
  }

  public getConversation<T extends BaseConversation>(conversationId: number): Observable<T> {
    return this._apiService.getValue(BaseConversation, `${this._basePath}/${conversationId}`) as Observable<T>;
  }


  public createMessage<T extends BaseConversation, TValue extends BaseMessageContent>(conversation: T, value: TValue): Observable<Message> {
    return this._apiService.createValue(Message, `${this._basePath}/${conversation.id}/messageContent`, value) as Observable<Message>;
  }

  public updateMessage<T extends BaseConversation>(conversation: T, value: MessageContent): Observable<MessageContent> {
    return this._apiService.updateValue(MessageContent, `${this._basePath}/${conversation.id}/messageContent/${value.id}`, value) as Observable<MessageContent>;
  }

  public getActiveMessages(query?: PageQuery): Observable<PageContainer<MessageWrapper>> {
    return this._apiService.getPageContainer(MessageWrapper, `${this._basePath}/message/active`, query);
  }

  public getUnreadTotal(): Observable<number> {
    return this._apiService.getValue(IntegerWrapper, `${this._basePath}/unread`).pipe(map(value => value.value));
  }

  public getMessages<T extends BaseConversation>(conversation: T, query?: PageQuery): Observable<PageContainer<Message>> {
    return this._apiService.getPageContainer(Message, `${this._basePath}/${conversation.id}/message`, query);
  }

  public deleteMessages<T extends BaseConversation>(conversation: T, messageContents: MessageContent[], query?: PageQuery): Observable<null> {
    return this._apiService.removeValue(null, `${this._basePath}/${conversation.id}/messageContent`, query, new ListRequest(messageContents.map(x => new IdRequest(x.id)))) as Observable<null>;
  }

  public deleteAllMessages<T extends BaseConversation>(conversation: T): Observable<null> {
    return this._apiService.removeValue(null, `${this._basePath}/${conversation.id}/message/all`) as Observable<null>;
  }

  public getNotificationsStatus<T extends BaseConversation>(conversation: T): Observable<boolean> {
    return this._apiService.getValue(BooleanWrapper, `${this._basePath}/${conversation.id}/notifications`).pipe(map(value => value.value));
  }

  public disableNotifications<T extends BaseConversation>(conversation: T): Observable<null> {
    return this._apiService.removeValue(null, `${this._basePath}/${conversation.id}/notifications/disable`) as Observable<null>;
  }

  public enableNotifications<T extends BaseConversation>(conversation: T): Observable<null> {
    return this._apiService.createValue(null, `${this._basePath}/${conversation.id}/notifications/enable`) as Observable<null>;
  }

  //region Participant

  public getParticipants<T extends BaseConversation>(query?: ConversationQuery): Observable<PageContainer<Participant>> {
    return this._apiService.getPageContainer(Participant, `${this._basePath}/participant`, query);
  }

  public updateParticipants<T extends BaseConversation>(conversation: T, persons: Person[]): Observable<Participant[]> {
    return this._apiService.createValue(Participant, `${this._basePath}/${conversation.id}/participant`, new ListRequest(persons.map(x => new IdRequest(x.id)))) as Observable<Participant[]>;
  }

  //endregion

  //region Chat

  public createChat(value: ChatRequest): Observable<Chat> {
    return this._apiService.createValue(Chat, this._basePath, value) as Observable<Chat>;
  }

  public updateChat<T extends BaseConversation>(conversation: T, value: Chat): Observable<Chat> {
    return this._apiService.updateValue(Chat, `${this._basePath}/${conversation.id}`, value) as Observable<Chat>;
  }

  public quitChat<T extends BaseConversation>(conversation: T): Observable<null> {
    return this._apiService.removeValue(null, `${this._basePath}/${conversation.id}/quit`) as Observable<null>;
  }

  public removeChat<T extends BaseConversation>(conversation: T): Observable<null> {
    return this._apiService.removeValue(null, `${this._basePath}/${conversation.id}`) as Observable<null>;
  }

  //endregion

}
