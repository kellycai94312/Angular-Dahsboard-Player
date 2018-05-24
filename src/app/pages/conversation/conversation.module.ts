import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationsPageComponent} from './conversations-page/conversations-page.component';
import {ConversationPageComponent} from './conversation-page/conversation-page.component';
import {ConversationRoutingModule} from './conversation-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {BusyButtonModule} from '../../components/busy-button/busy-button.module';
import {FormsModule} from '@angular/forms';
import {MessageComponent} from './message/message.component';
import {ConversationComponent} from './conversation/conversation.component';

@NgModule({
  imports: [
    CommonModule,
    ConversationRoutingModule,
    TranslateModule.forChild(),
    NgxVirtualScrollModule,
    BusyButtonModule,
    FormsModule
  ],
  declarations: [ConversationsPageComponent, ConversationPageComponent, MessageComponent, ConversationComponent]
})
export class ConversationModule {
}
