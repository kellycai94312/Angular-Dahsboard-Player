import {map, takeWhile} from 'rxjs/operators';
import {Injectable, OnDestroy} from '@angular/core';
import {ParticipantStompService} from '../data/remote/web-socket/participant-stomp.service';
import {Subject} from 'rxjs';
import {MessageWrapper} from '../data/remote/bean/wrapper/message-wrapper';
import {IntegerWrapper} from '../data/remote/bean/wrapper/integer-wrapper';
import {Participant} from '../data/remote/model/chat';
import {Message} from '../data/remote/model/chat/message';
import {ParticipantRestApiService} from '../data/remote/rest-api/participant-rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService implements OnDestroy {

  public readonly messageCreateHandle = new Subject<MessageWrapper>();
  public readonly messageUpdateHandle = new Subject<MessageWrapper>();
  public readonly messageDeleteHandle = new Subject<MessageWrapper>();
  public readonly messageReadHandle = new Subject<Message>();
  public readonly unreadTotalHandle = new Subject<IntegerWrapper>();
  public readonly typingHandle = new Subject<Participant>();
  public readonly errorHandle = new Subject<any>();
  private _notDestroyed = true;

  constructor(private _participantStompService: ParticipantStompService,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  public messageCreateSubscribe() {
    this._participantStompService.subscribeConversationCreate()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<MessageWrapper>(message))
      )
      .subscribe(async message => this.messageCreateHandle.next(message));
  }

  public messageUpdateSubscribe() {
    this._participantStompService.subscribeConversationUpdate()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<MessageWrapper>(message))
      )
      .subscribe(async message => {
        this.messageUpdateHandle.next(message);
      });
  }

  public messageDeleteSubscribe() {
    this._participantStompService.subscribeConversationDelete()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<MessageWrapper>(message))
      )
      .subscribe(async message => {
        this.messageDeleteHandle.next(message);
      });
  }

  public messageReadSubscribe() {
    this._participantStompService.subscribeConversationRead()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<Message>(message))
      )
      .subscribe(async message => {
        this.messageReadHandle.next(message);
      });
  }

  public readMessage(messageWrapper: MessageWrapper) {
    messageWrapper.message.read = true;
    delete messageWrapper.unread;
  }

  public async getUnreadTotalMessages(): Promise<number> {
    return (await this._participantRestApiService.getUnreadTotalMessages()).value;
  }

  private unreadTotalSubscribe() {
    this._participantStompService.subscribeConversationUnreadTotal()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<IntegerWrapper>(message))
      )
      .subscribe(async message => {
        this.unreadTotalHandle.next(message);
      });
  }

  private typingSubscribe() {
    this._participantStompService.subscribeConversationTyping()
      .pipe(
        takeWhile(() => this._notDestroyed),
        map(message => this._participantStompService.messageToObject<Participant>(message))
      )
      .subscribe(async message => {
        this.typingHandle.next(message);
      });
  }

  private errorSubscribe() {
    this._participantStompService.subscribeError()
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async message => {
        this.errorHandle.next(message);
      });
  }

  public subscribe() {
    this._notDestroyed = true;

    this.errorSubscribe();

    this.messageCreateSubscribe();
    this.messageUpdateSubscribe();
    this.messageDeleteSubscribe();
    this.messageReadSubscribe();
    this.unreadTotalSubscribe();
    this.typingSubscribe();
  }

  public unsubscribe() {
    this._notDestroyed = false;
  }

}
