import {Injectable, OnDestroy} from '@angular/core';
import {ParticipantStompService} from '../data/remote/web-socket/participant-stomp.service';
import {Subject} from 'rxjs/Subject';
import {ISubscription} from 'rxjs/Subscription';
import {MessageWrapper} from '../data/remote/bean/wrapper/message-wrapper';

@Injectable()
export class ConversationService implements OnDestroy {

  public readonly messageHandle: Subject<MessageWrapper>;
  public readonly readMessageHandle: Subject<MessageWrapper>;
  public readonly errorHandle: Subject<any>;

  private _messageSubscription: ISubscription;
  private _readMessageSubscription: ISubscription;
  private _errorSubscription: ISubscription;

  constructor(private _participantStompService: ParticipantStompService) {
    this.messageHandle = new Subject<MessageWrapper>();
    this.readMessageHandle = new Subject<MessageWrapper>();
    this.errorHandle = new Subject<any>();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  //#region Message

  public messageSubscribe() {
    if (this._messageSubscription) {
      return;
    }

    try {
      this._messageSubscription = this._participantStompService.subscribeConversation()
        .map(message => this._participantStompService.messageToObject<MessageWrapper>(message))
        .subscribe(async message => {
          this.messageHandle.next(message);
        });
    } catch (e) {
    }
  }

  public messageUnsubscribe() {
    if (this._messageSubscription) {
      this._messageSubscription.unsubscribe();
      delete this._messageSubscription;
    }
  }

  //#endregion

  //#region ReadMessage

  private readMessageSubscribe() {
    if (this._readMessageSubscription) {
      return;
    }

    try {
      this._readMessageSubscription = this._participantStompService.subscribeConversationRead()
        .map(message => this._participantStompService.messageToObject<MessageWrapper>(message))
        .subscribe(async message => {
          this.readMessageHandle.next(message);
        });
    } catch (e) {
    }
  }

  private readMessageUnsubscribe() {
    if (this._readMessageSubscription) {
      this._readMessageSubscription.unsubscribe();
      delete this._readMessageSubscription;
    }
  }

  //#endregion

  //#region Error

  private errorSubscribe() {
    if (this._errorSubscription) {
      return;
    }

    try {
      this._errorSubscription = this._participantStompService.subscribeConversationError()
        .subscribe(async message => {
          this.errorHandle.next(message);
        });
    } catch (e) {
    }
  }

  private errorUnsubscribe() {
    if (this._errorSubscription) {
      this._errorSubscription.unsubscribe();
      delete this._errorSubscription;
    }
  }

  //#endregion

  public subscribe() {
    this.errorSubscribe();
    this.messageSubscribe();
    this.readMessageSubscribe();
  }

  public unsubscribe() {
    this.messageUnsubscribe();
    this.readMessageUnsubscribe();
    this.errorUnsubscribe();
  }

}
