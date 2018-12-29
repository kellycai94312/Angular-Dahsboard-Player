import {NgModule} from '@angular/core';
import {BaseConversationPageRoutingModule} from './base-conversation-page-routing.module';
import {BaseConversationPageComponent} from './base-conversation-page/base-conversation-page.component';
import {EditChatModule} from '../../module/conversation/edit-chat/edit-chat.module';
import {ConversationModalService} from './service/conversation-modal/conversation-modal.service';

@NgModule({
  imports: [
    BaseConversationPageRoutingModule,
    EditChatModule
  ],
  declarations: [BaseConversationPageComponent],
  providers: [ConversationModalService]
})
export class BaseConversationPageModule {
}
