import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, NgZone } from '@angular/core';
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
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          opacity: 0
        }),
        style({
          opacity: 1
        })
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1
        }),
        style({
          opacity: 0
        })
      ])))
    ])
  ],
  preserveWhitespaces: false
})
export class MessageNotificationItemComponent extends Toast {

  public conversationWrapper: ConversationWrapper;

  constructor(toastrService: ToastrService, toastPackage: ToastPackage, ngZone: NgZone) {
    super(toastrService, toastPackage, ngZone);
  }

  public initialize(conversationWrapper: ConversationWrapper): void {
    this.conversationWrapper = conversationWrapper;
  }

}
