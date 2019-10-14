import { Injectable, OnDestroy } from '@angular/core';
import { Message } from 'app/data/remote/model/chat';
import { Observable, Subject } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { IntegerWrapper } from '../data/remote/bean/wrapper/integer-wrapper';
import { MessageWrapper } from '../data/remote/bean/wrapper/message-wrapper';
import { Participant } from '../data/remote/model/chat';
import { ParticipantRestApiService } from '../data/remote/rest-api/participant-rest-api.service';
import { ParticipantStompService } from '../data/remote/web-socket/participant-stomp.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService implements OnDestroy {

  private readonly _messageCreateSubject = new Subject<MessageWrapper>();
  private readonly _messageUpdateSubject = new Subject<MessageWrapper>();
  private readonly _messageDeleteSubject = new Subject<MessageWrapper>();
  private readonly _messageReadSubject = new Subject<Message>();
  private readonly _unreadTotalSubject = new Subject<number>();
  private readonly _typingSubject = new Subject<Participant>();
  private readonly _errorSubject = new Subject<any>();
  private _notDestroyed = true;

  constructor(private _participantStompService: ParticipantStompService,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  //region Getters

  public get messageCreate$(): Observable<MessageWrapper> {
    return this._messageCreateSubject.asObservable();
  }

  public get messageUpdate$(): Observable<MessageWrapper> {
    return this._messageUpdateSubject.asObservable();
  }

  public get messageDelete$(): Observable<MessageWrapper> {
    return this._messageDeleteSubject.asObservable();
  }

  public get messageRead$(): Observable<Message> {
    return this._messageReadSubject.asObservable();
  }

  public get unreadTotal$(): Observable<number> {
    return this._unreadTotalSubject.asObservable();
  }

  public get typing$(): Observable<Participant> {
    return this._typingSubject.asObservable();
  }

  public get error$(): Observable<any> {
    return this._errorSubject.asObservable();
  }

  //endregion

  public ngOnDestroy(): void {
    this.unsubscribe();
  }

  public subscribe(): void {
    this._notDestroyed = true;

    this._errorSubscribe();

    this._messageCreateSubscribe();
    this._messageUpdateSubscribe();
    this._messageDeleteSubscribe();
    this._messageReadSubscribe();
    this._unreadTotalSubscribe();
    this._typingSubscribe();
  }

  public unsubscribe(): void {
    delete this._notDestroyed;
  }

  public readMessage(messageWrapper: MessageWrapper): void {
    messageWrapper.message.read = true;
    delete messageWrapper.unread;
  }

  private _messageCreateSubscribe(): void {
    this._participantStompService.subscribeConversationCreate()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject(MessageWrapper, message))
      )
      .subscribe(value => this._messageCreateSubject.next(value));
  }

  private _messageUpdateSubscribe(): void {
    this._participantStompService.subscribeConversationUpdate()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<MessageWrapper>(MessageWrapper, message))
      )
      .subscribe(value => this._messageUpdateSubject.next(value));
  }

  private _messageDeleteSubscribe(): void {
    this._participantStompService.subscribeConversationDelete()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<MessageWrapper>(MessageWrapper, message))
      )
      .subscribe(value => this._messageDeleteSubject.next(value));
  }

  private _messageReadSubscribe(): void {
    this._participantStompService.subscribeConversationRead()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<Message>(Message, message))
      )
      .subscribe(value => this._messageReadSubject.next(value));
  }

  private _unreadTotalSubscribe(): void {
    this._participantStompService.subscribeConversationUnreadTotal()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<IntegerWrapper>(IntegerWrapper, message))
      )
      .subscribe(value => this._unreadTotalSubject.next(value.value));
  }

  private _typingSubscribe(): void {
    this._participantStompService.subscribeConversationTyping()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<Participant>(Participant, message))
      )
      .subscribe(value => this._typingSubject.next(value));
  }

  private _errorSubscribe(): void {
    this._participantStompService.subscribeError()
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(value => this._errorSubject.next(value));
  }

}
