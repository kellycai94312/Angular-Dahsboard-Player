import { Injectable, OnDestroy } from '@angular/core';
import { ConversationWrapper } from 'app/data/local/conversation-wrapper';
import { MessageWrapper } from 'app/data/remote/bean/wrapper/message-wrapper';
import { Person } from 'app/data/remote/model/person';
import { MessageNotificationItemComponent } from 'app/module/conversation/message-notification-item/message-notification-item/message-notification-item.component';
import { AuthorizationService } from 'app/shared/authorization.service';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageNotificationService implements OnDestroy {

  private readonly _conversations = new Map<number, Array<ActiveToast<MessageNotificationItemComponent>>>();
  private _notDestroyed = true;
  private _person: Person;

  constructor(private _toastrService: ToastrService,
              private _authorizationService: AuthorizationService) {
    this._authorizationService.personSubject
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(value => {
        this._person = value;
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

  public addAndShowNotification(messageWrapper: MessageWrapper): void {
    const activeToast: ActiveToast<MessageNotificationItemComponent> = this._toastrService.show(void 0, void 0, {
      toastComponent: MessageNotificationItemComponent,
      disableTimeOut: true,
      toastClass: '',
      positionClass: 'toast-bottom-right'
    });
    activeToast.toastRef.componentInstance.initialize(new ConversationWrapper(messageWrapper));
    this._addToast(messageWrapper, activeToast);
  }

  public updateToast(messageWrapper: MessageWrapper): void {
    const conversationId = messageWrapper.message.content.baseConversation.id;
    if (this._conversations.has(conversationId)) {
      const toasts = this._conversations.get(conversationId);
      let index = toasts.length;
      while (index--) {
        const item = toasts[index].toastRef.componentInstance;
        if (item.conversationWrapper.messageWrapper.message.id == messageWrapper.message.id) {
          item.initialize(new ConversationWrapper(messageWrapper));
          return;
        }
      }
    }
  }

  public deleteToast(messageWrapper: MessageWrapper): void {
    const conversationId = messageWrapper.message.content.baseConversation.id;
    if (this._conversations.has(conversationId)) {
      const toasts = this._conversations.get(conversationId);
      let index = toasts.length;
      while (index--) {
        const item = toasts[index].toastRef.componentInstance;
        if (item.conversationWrapper.messageWrapper.message.id == messageWrapper.message.id) {
          toasts[index].toastRef.manualClose();
          toasts.splice(index, 1);
          break;
        }
      }
    }
  }

  public clearToasts(conversationId: number): void {
    if (this._conversations.has(conversationId)) {
      const toasts = this._conversations.get(conversationId);
      for (const toast of toasts) {
        toast.toastRef.manualClose();
      }
      this._conversations.delete(conversationId);
    }
  }

  public canShowMessageNotification(messageWrapper: MessageWrapper): boolean {
    return messageWrapper.message.receiver.enabled && this._person && messageWrapper.message.sender.person.id != this._person.id;
  }

  private _addToast(messageWrapper: MessageWrapper, toast: ActiveToast<MessageNotificationItemComponent>): void {
    const conversationId = messageWrapper.message.content.baseConversation.id;
    if (this._conversations.has(conversationId)) {
      this._conversations.get(conversationId).push(toast);
    } else {
      this._conversations.set(conversationId, [toast]);
    }
  }

}
