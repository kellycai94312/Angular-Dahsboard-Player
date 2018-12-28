import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationsComponent} from './conversations/conversations.component';
import {NgxInputModule} from '../../../components/ngx-input/ngx-input.module';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {ConversationItemModule} from '../conversation-item/conversation-item.module';

@NgModule({
  declarations: [ConversationsComponent],
  imports: [
    CommonModule,
    NgxInputModule,
    NgxButtonModule,
    NgxVirtualScrollModule,
    ConversationItemModule
  ],
  exports: [ConversationsComponent]
})
export class ConversationsModule {
}
