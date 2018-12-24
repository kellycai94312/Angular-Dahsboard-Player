import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationItemComponent} from './conversation-item/conversation-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {ImageModule} from '../../../components/image/image.module';
import {MessageItemModule} from '../message-item/message-item.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([]),
    ImageModule,
    MessageItemModule
  ],
  declarations: [ConversationItemComponent],
  exports: [ConversationItemComponent]
})
export class ConversationItemModule {
}
