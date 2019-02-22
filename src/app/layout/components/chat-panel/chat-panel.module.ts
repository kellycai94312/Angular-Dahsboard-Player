import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatTabsModule, MatTooltipModule} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';

import {ChatPanelComponent} from 'app/layout/components/chat-panel/chat-panel.component';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {ConversationItemModule} from '../../../module/conversation/conversation-item/conversation-item.module';
import {ConversationViewModule} from '../../../module/conversation/conversation-view/conversation-view.module';
import {TranslateModule} from '@ngx-translate/core';
import {ConversationsModule} from '../../../module/conversation/conversations/conversations.module';

@NgModule({
  declarations: [
    ChatPanelComponent
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatTooltipModule,
    MatRippleModule,

    FuseSharedModule,
    NgxImageModule,
    ConversationItemModule,
    ConversationViewModule,
    ConversationsModule,
    TranslateModule.forChild()
  ],
  exports: [
    ChatPanelComponent
  ]
})
export class ChatPanelModule {
}
