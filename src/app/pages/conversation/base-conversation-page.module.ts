import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRadioModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { NgxButtonModule } from '../../components/ngx-button/ngx-button.module';
import { NgxInputModule } from '../../components/ngx-input/ngx-input.module';
import { NgxVirtualScrollModule } from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import { ConfirmationRemovingMessageModule } from '../../module/conversation/confirmation-removing-message/confirmation-removing-message.module';
import { ConversationItemModule } from '../../module/conversation/conversation-item/conversation-item.module';
import { ConversationViewModule } from '../../module/conversation/conversation-view/conversation-view.module';
import { ConversationsModule } from '../../module/conversation/conversations/conversations.module';
import { EditChatModule } from '../../module/conversation/edit-chat/edit-chat.module';
import { MessageItemModule } from '../../module/conversation/message-item/message-item.module';
import { BaseConversationPageRoutingModule } from './base-conversation-page-routing.module';
import { BaseConversationPageComponent } from './base-conversation-page/base-conversation-page.component';
import { ChatStartComponent } from './chat/chat-start/chat-start.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { ChatChatsSidenavComponent } from './chat/sidenavs/left/chats/chats.component';
import { ChatLeftSidenavComponent } from './chat/sidenavs/left/left.component';
import { ChatContactSidenavComponent } from './chat/sidenavs/right/contact/contact.component';
import { ChatRightSidenavComponent } from './chat/sidenavs/right/right.component';
import { ConversationModalService } from './service/conversation-modal/conversation-modal.service';

@NgModule({
  imports: [
    BaseConversationPageRoutingModule,
    EditChatModule,
    NgxInputModule,
    NgxButtonModule,
    NgxVirtualScrollModule,
    ConversationItemModule,
    MessageItemModule,
    TranslateModule.forChild(),
    ConfirmationRemovingMessageModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    FuseSharedModule,
    ConversationViewModule,
    ConversationsModule
  ],
  declarations: [
    ChatComponent,
    ChatStartComponent,
    ChatChatsSidenavComponent,
    ChatLeftSidenavComponent,
    ChatRightSidenavComponent,
    ChatContactSidenavComponent,
    BaseConversationPageComponent
  ],
  providers: [ConversationModalService, ChatService]
})
export class BaseConversationPageModule {
}
