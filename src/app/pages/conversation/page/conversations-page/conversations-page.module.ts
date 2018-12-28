import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationsPageRoutingModule} from './conversations-page-routing.module';
import {ConversationsPageComponent} from './conversations-page/conversations-page.component';
import {ConversationsModule} from '../../../../module/conversation/conversations/conversations.module';

@NgModule({
  imports: [
    CommonModule,
    ConversationsPageRoutingModule,
    ConversationsModule
  ],
  declarations: [ConversationsPageComponent]
})
export class ConversationsPageModule {
}
