import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';

import {ChatPanelModule} from 'app/layout/components/chat-panel/chat-panel.module';
import {ContentModule} from 'app/layout/components/content/content.module';
import {FooterModule} from 'app/layout/components/footer/footer.module';
import {NavbarModule} from 'app/layout/components/navbar/navbar.module';
import {QuickPanelModule} from 'app/layout/components/quick-panel/quick-panel.module';
import {ToolbarModule} from 'app/layout/components/toolbar/toolbar.module';

import {VerticalLayout1Component} from 'app/layout/vertical/layout-1/layout-1.component';
import {NgxContainerModule} from '../../../module/ngx/ngx-container/ngx-container.module';
import {ConversationsModule} from '../../../module/conversation/conversations/conversations.module';
import {ConversationViewModule} from '../../../module/conversation/conversation-view/conversation-view.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    VerticalLayout1Component
  ],
  imports: [
    RouterModule,

    FuseSharedModule,
    FuseSidebarModule,

    ChatPanelModule,
    ContentModule,
    FooterModule,
    NavbarModule,
    QuickPanelModule,
    ToolbarModule,
    NgxContainerModule,
    ConversationsModule,
    ConversationViewModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule.forChild()
  ],
  exports: [
    VerticalLayout1Component
  ]
})
export class VerticalLayout1Module {
}
