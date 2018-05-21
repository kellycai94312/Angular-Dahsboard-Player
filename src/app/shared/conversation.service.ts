import {Injectable, OnDestroy} from '@angular/core';
import {ParticipantStompService} from '../data/remote/web-socket/participant-stomp.service';
import {Subject} from 'rxjs/Subject';
import {ISubscription} from 'rxjs/Subscription';
import {MessageWrapper} from '../data/remote/bean/wrapper/message-wrapper';
import {Message} from '../data/remote/model/chat/message/message';

@Injectable()
export class ConversationService implements OnDestroy {

  public readonly messageHandle: Subject<MessageWrapper>;
  public readonly readMessageHandle: Subject<Message>;
  public readonly errorHandle: Subject<any>;

  private _messageSubscription: ISubscription;
  private _readMessageSubscription: ISubscription;
  private _errorSubscription: ISubscription;

  constructor(private _participantStompService: ParticipantStompService) {
    this.messageHandle = new Subject<MessageWrapper>();
    this.readMessageHandle = new Subject<Message>();
    this.errorHandle = new Subject<any>();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

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
    this.unsubscribeFrom(this._messageSubscription);
  }

  private readMessageSubscribe() {
    if (this._readMessageSubscription) {
      return;
    }

    try {
      this._readMessageSubscription = this._participantStompService.subscribeConversationRead()
        .map(message => this._participantStompService.messageToObject<Message>(message))
        .subscribe(async message => {
          this.readMessageHandle.next(message);
        });
    } catch (e) {
    }
  }

  private readMessageUnsubscribe() {
    this.unsubscribeFrom(this._readMessageSubscription);
  }

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
    this.unsubscribeFrom(this._errorSubscription);
  }

  private unsubscribeFrom(subscription: ISubscription) {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }

}
