import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationWrapper } from 'app/data/local/conversation-wrapper';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message-notification-item',
  templateUrl: './message-notification-item.component.html',
  styleUrls: ['./message-notification-item.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0
      })),
      transition('inactive => active', animate('300ms ease-out')),
      transition('active => removed', animate('300ms ease-out'))
    ])
  ],
  preserveWhitespaces: false
})
export class MessageNotificationItemComponent extends Toast {

  public conversationWrapper: ConversationWrapper;

  constructor(private _router: Router,
              toastrService: ToastrService, toastPackage: ToastPackage, ngZone: NgZone) {
    super(toastrService, toastPackage, ngZone);
  }

  public initialize(conversationWrapper: ConversationWrapper): void {
    this.conversationWrapper = conversationWrapper;
  }

  public async onDataClick(): Promise<void> {
    const conversationId = this.conversationWrapper.messageWrapper.message.content.baseConversation.id;
    await this._router.navigate(['/conversation', conversationId]);
  }

}
