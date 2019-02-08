import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationItemComponent} from './conversation-item/conversation-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {ImageModule} from '../../../components/image/image.module';
import {MessageItemModule} from '../message-item/message-item.module';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {MatButtonModule} from '@angular/material';
import {ChatService} from '../../../pages/conversation/chat/chat.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([]),
    ImageModule,
    MessageItemModule,
    MatButtonModule,
    FuseSharedModule
  ],
  declarations: [ConversationItemComponent],
  exports: [ConversationItemComponent],
  providers: [ChatService]
})
export class ConversationItemModule {
}
