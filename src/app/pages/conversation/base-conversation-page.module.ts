import {NgModule} from '@angular/core';
import {BaseConversationPageRoutingModule} from './base-conversation-page-routing.module';
import {EditChatModule} from '../../module/conversation/edit-chat/edit-chat.module';
import {ConversationModalService} from './service/conversation-modal/conversation-modal.service';
import {ChatComponent} from './chat/chat.component';
import {ChatStartComponent} from './chat/chat-start/chat-start.component';
import {ChatChatsSidenavComponent} from './chat/sidenavs/left/chats/chats.component';
import {ChatLeftSidenavComponent} from './chat/sidenavs/left/left.component';
import {ChatRightSidenavComponent} from './chat/sidenavs/right/right.component';
import {ChatContactSidenavComponent} from './chat/sidenavs/right/contact/contact.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRadioModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {ChatService} from './chat/chat.service';
import {NgxInputModule} from '../../components/ngx-input/ngx-input.module';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {ConversationItemModule} from '../../module/conversation/conversation-item/conversation-item.module';
import {TranslateModule} from '@ngx-translate/core';
import {MessageItemModule} from '../../module/conversation/message-item/message-item.module';
import {ImageModule} from '../../components/image/image.module';
import {BaseConversationPageComponent} from './base-conversation-page/base-conversation-page.component';
import {ConfirmationRemovingMessageModule} from '../../module/conversation/confirmation-removing-message/confirmation-removing-message.module';
import {ConversationViewModule} from '../../module/conversation/conversation-view/conversation-view.module';

@NgModule({
  imports: [
    BaseConversationPageRoutingModule,
    EditChatModule,
    NgxInputModule,
    NgxButtonModule,
    NgxVirtualScrollModule,
    ConversationItemModule,
    MessageItemModule,
    ImageModule,
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
    ConversationViewModule
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
