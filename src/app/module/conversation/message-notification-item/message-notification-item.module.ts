import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConversationItemModule } from 'app/module/conversation/conversation-item/conversation-item.module';
import { MessageNotificationItemComponent } from './message-notification-item/message-notification-item.component';

@NgModule({
  declarations: [MessageNotificationItemComponent],
  entryComponents: [MessageNotificationItemComponent],
  exports: [MessageNotificationItemComponent],
  imports: [
    CommonModule,
    ConversationItemModule
  ]
})
export class MessageNotificationItemModule {
}
