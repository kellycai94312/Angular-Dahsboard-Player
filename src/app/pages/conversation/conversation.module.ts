import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationsPageComponent} from './conversations-page/conversations-page.component';
import {ConversationPageComponent} from './conversation-page/conversation-page.component';
import {ConversationRoutingModule} from './conversation-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';

@NgModule({
  imports: [
    CommonModule,
    ConversationRoutingModule,
    TranslateModule.forChild(),
    NgxVirtualScrollModule
  ],
  declarations: [ConversationsPageComponent, ConversationPageComponent]
})
export class ConversationModule {
}
