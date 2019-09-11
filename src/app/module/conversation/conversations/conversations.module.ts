import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationsComponent} from './conversations/conversations.component';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {ConversationItemModule} from '../conversation-item/conversation-item.module';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ConversationsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxVirtualScrollModule,
    ConversationItemModule
  ],
  exports: [ConversationsComponent]
})
export class ConversationsModule {
}
