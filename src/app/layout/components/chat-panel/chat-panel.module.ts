import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatTabsModule, MatTooltipModule} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';

import {ChatPanelComponent} from 'app/layout/components/chat-panel/chat-panel.component';
import {ChatPanelService} from 'app/layout/components/chat-panel/chat-panel.service';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {ConversationItemModule} from '../../../module/conversation/conversation-item/conversation-item.module';
import {ConversationViewModule} from '../../../module/conversation/conversation-view/conversation-view.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChatPanelComponent
  ],
  providers: [
    ChatPanelService
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
    TranslateModule.forChild()
  ],
  exports: [
    ChatPanelComponent
  ]
})
export class ChatPanelModule {
}
