import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationsPageComponent} from './conversations-page/conversations-page.component';
import {ConversationPageComponent} from './conversation-page/conversation-page.component';
import {ConversationRoutingModule} from './conversation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ConversationRoutingModule
  ],
  declarations: [ConversationsPageComponent, ConversationPageComponent]
})
export class ConversationModule {
}
