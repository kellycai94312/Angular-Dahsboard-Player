import {Injectable, OnDestroy} from '@angular/core';
import {ParticipantStompService} from '../data/remote/web-socket/participant-stomp.service';
import {Subject} from 'rxjs/Subject';
import {ISubscription} from 'rxjs/Subscription';
import {MessageWrapper} from '../data/remote/bean/wrapper/message-wrapper';

@Injectable()
export class ConversationService implements OnDestroy {

  public readonly messageHandle: Subject<MessageWrapper>;

  private _messageSubscription: ISubscription;

  constructor(private _participantStompService: ParticipantStompService) {
    this.messageHandle = new Subject<MessageWrapper>();
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
    if (this._messageSubscription) {
      this._messageSubscription.unsubscribe();
      delete this._messageSubscription;
    }
  }

  public unsubscribe() {
    this.messageUnsubscribe();
  }

}
