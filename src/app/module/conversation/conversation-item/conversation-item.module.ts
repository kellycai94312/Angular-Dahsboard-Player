import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationItemComponent} from './conversation-item/conversation-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {MessageItemModule} from '../message-item/message-item.module';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([]),
    NgxImageModule,
    MessageItemModule,
    FuseSharedModule
  ],
  declarations: [ConversationItemComponent],
  exports: [ConversationItemComponent]
})
export class ConversationItemModule {
}
