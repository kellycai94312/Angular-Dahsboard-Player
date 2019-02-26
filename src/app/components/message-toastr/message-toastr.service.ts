import {Injectable, OnDestroy} from '@angular/core';
import {ActiveToast, ToastrService} from 'ngx-toastr/toastr/toastr.service';
import {Message} from '../../data/remote/model/chat/message/message';
import {AuthorizationService} from '../../shared/authorization.service';
import {Person} from '../../data/remote/model/person';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MessageToastrComponent} from './message-toastr.component';

@Injectable()
export class MessageToastrService implements OnDestroy {

  private readonly messages: Map<number, Array<ActiveToast<any>>>;
  private readonly _unsubscribeAll: Subject<void>;

  private _person: Person;

  constructor(private _authorizationService: AuthorizationService,) {
    this.messages = new Map<number, Array<ActiveToast<any>>>();
    this._unsubscribeAll = new Subject<void>();

    this._authorizationService.personSubject
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(val => {
        this._person = val;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // TODO: Can't add dependency injection for ToastrService
  public showAndAddToast(toastrService: ToastrService, message: Message): void {
    const toast = toastrService.show(null, null,
      {
        toastComponent: MessageToastrComponent,
        disableTimeOut: false,
        tapToDismiss: false,
        toastClass: 'toast p-1'
      }
    );
    const instance = toast.toastRef.componentInstance as MessageToastrComponent;
    instance.message = message;
    this.addToast(message, toast);
  }

  private addToast(message: Message, toast: ActiveToast<any>): void {
    const conversationId = message.content.baseConversation.id;
    if (this.messages.has(conversationId)) {
      const toasts = this.messages.get(conversationId);
      toasts.push(toast);
    } else {
      const toasts = [];
      toasts.push(toast);
      this.messages.set(conversationId, toasts);
    }
  };

  public async updateToast(message: Message): Promise<void> {
    const conversationId = message.content.baseConversation.id;
    if (this.messages.has(conversationId)) {
      const toasts = this.messages.get(conversationId);
      let index = toasts.length;
      while (index--) {
        if (toasts[index].toastRef.componentInstance.message.id == message.id) {
          await toasts[index].toastRef.componentInstance.buildMessageViewModal(message);
          break;
        }
      }
    }
  }

  public deleteToast(message: Message): void {
    const conversationId = message.content.baseConversation.id;
    if (this.messages.has(conversationId)) {
      const toasts = this.messages.get(conversationId);
      let index = toasts.length;
      while (index--) {
        if (toasts[index].toastRef.componentInstance.message.id == message.id) {
          toasts[index].toastRef.manualClose();
          toasts.splice(index, 1);
          break;
        }
      }
    }
  }

  public clearToasts(conversationId: number): void {
    if (this.messages.has(conversationId)) {
      const toasts = this.messages.get(conversationId);
      for (const toast of toasts) {
        toast.toastRef.manualClose();
      }
      this.messages.delete(conversationId);
    }
  }

  public canShowMessageNotification(message: Message) {
    return message.receiver.enabled && this._person && message.sender.person.id != this._person.id;
  }

}
