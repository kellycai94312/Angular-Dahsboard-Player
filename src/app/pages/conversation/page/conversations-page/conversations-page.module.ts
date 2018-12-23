import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationsPageRoutingModule} from './conversations-page-routing.module';
import {ConversationsPageComponent} from './conversations-page/conversations-page.component';
import {NgxInputModule} from '../../../../components/ngx-input/ngx-input.module';
import {NgxButtonModule} from '../../../../components/ngx-button/ngx-button.module';
import {NgxVirtualScrollModule} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {ConversationItemModule} from '../../../../module/conversation/conversation-item/conversation-item.module';

@NgModule({
  imports: [
    CommonModule,
    ConversationsPageRoutingModule,
    NgxInputModule,
    NgxButtonModule,
    NgxVirtualScrollModule,
    ConversationItemModule
  ],
  declarations: [ConversationsPageComponent]
})
export class ConversationsPageModule {
}
