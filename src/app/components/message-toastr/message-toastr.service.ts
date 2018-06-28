import {Injectable} from '@angular/core';
import {ActiveToast} from 'ngx-toastr/toastr/toastr.service';
import {Message} from '../../data/remote/model/chat/message/message';

@Injectable()
export class MessageToastrService {

  private readonly messages: Map<number, Array<ActiveToast<any>>>;

  constructor() {
    this.messages = new Map<number, Array<ActiveToast<any>>>();
  }

  public addToast(message: Message, toast: ActiveToast<any>): void {
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
      for (let toast of toasts) {
        toast.toastRef.manualClose();
      }
      this.messages.delete(conversationId);
    }
  }

}
