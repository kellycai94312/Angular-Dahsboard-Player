import {NgModule} from '@angular/core';
import {BaseConversationPageRoutingModule} from './base-conversation-page-routing.module';
import {BaseConversationPageComponent} from './base-conversation-page/base-conversation-page.component';

@NgModule({
  imports: [
    BaseConversationPageRoutingModule
  ],
  declarations: [BaseConversationPageComponent]
})
export class BaseConversationPageModule {
}
